import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiError } from 'src/common/exceptions/ApiError';
import { UserSchemaClass } from 'src/schemas/user.schemas';
import { User } from 'src/types';
import { CreateUserDto, SignInUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
//prettier-ignore
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    @InjectModel(UserSchemaClass.name)
    private userModel: mongoose.Model<UserSchemaClass>,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const userExist = await this.userModel.findOne({
        email: createUserDto.email,
      });

      if (userExist) {
        throw new ApiError('User already Exists', HttpStatus.CONFLICT);
      }

      const hashPw= await bcrypt.hash(createUserDto.password,10);
      

      return await this.userService.createUser(createUserDto);
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

  @Post('signIn')
  async Signin(@Body() signInUserDto:SignInUserDto){

  }


}
