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

  @Post('signin')
  async Signin(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.auth.signIn(signInUserDto, res);
  }
  @Post('signout')
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.auth.signOut(res);
  }
}
