import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async signUp(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.auth.registerUser(user, res);
  }

  @Post('signIn')
  async Signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.auth.signIn(signInUserDto, res);
  }
  @Post('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    return this.auth.signOut(res);
  }
}
