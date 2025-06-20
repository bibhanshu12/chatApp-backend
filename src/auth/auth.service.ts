import { Body, HttpStatus, Injectable, Res } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
import { UserSchemaClass } from 'src/schemas/user.schemas';
import { UsersService } from 'src/users/users.service';
import { JwtTokenService } from './utils/generateToken';
import { CreateUserDto, SignInUserDto } from 'src/users/dto/user.dto';
import { Gender } from 'src/types';
import { InjectModel } from '@nestjs/mongoose';
import { ApiError } from 'src/common/exceptions/ApiError';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

export interface User {
  _id?: string | Types.ObjectId; // ✅ add this line
  name: string;
  nickName: string;
  password?: string;
  email: string;
  bio: string;
  phoneNumber: number;
  gender: Gender;
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    @InjectModel(UserSchemaClass.name)
    private userModel: mongoose.Model<UserSchemaClass>,
    private authService: JwtTokenService,
  ) {}

  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ msg: string; User: User; token: string }> {
    try {
      const userExist = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (userExist) {
        throw new ApiError('User already Exists', HttpStatus.CONFLICT);
      }

      const hashPw = await bcrypt.hash(createUserDto.password, 10);
      const secureUser = { ...createUserDto, password: hashPw };
      const createdUser = await this.userService.createUser(secureUser);
      const token = this.authService.generateToken(
        {
          _id: createdUser._id.toString(),
          name: createdUser.name,
          email: createdUser.email,
        },
        res,
      );
      return {
        msg: 'User registered Successfully!',
        User: createdUser,
        token: token,
      };
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }

      console.error('Unexpected Register Error:', error);

      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Register Error',
      );
    }
  }

  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ msg: string; user: User; token: string }> {
    try {
      const fetchUser = await this.userModel.findOne({
        email: signInUserDto.email,
      });
      if (!fetchUser) {
        throw new ApiError(
          'User not found, Please Signin First',
          HttpStatus.CONFLICT,
        );
      }
      console.log('Attempting login for:', signInUserDto.email);
      console.log('Fetched user:', fetchUser);
      console.log('Stored password:', fetchUser?.password);

      const passwordCompare = await bcrypt.compare(
        signInUserDto.password,
        fetchUser.password,
      );
      if (!passwordCompare) {
        throw new ApiError('Wrong Password!', HttpStatus.CONFLICT);
      }

      const token = this.authService.generateToken(
        {
          _id: fetchUser._id.toString(),
          name: fetchUser.name,
          email: fetchUser.email,
        },
        res,
      );

      return {
        msg: 'Logged In successfully!',
        user: fetchUser,
        token: token,
      };
    } catch (err: any) {
      throw new ApiError('caused Error while signin', HttpStatus.CONFLICT, err);
    }
  }

  signOut(res: Response): { msg: string; status: HttpStatus } {
    res.clearCookie('token');
    return {
      msg: 'Signed out',
      status: HttpStatus.OK,
    };
  }
}
