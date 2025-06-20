import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export interface JwtUserPayload {
  _id: string;
  email: string;
  name: string;
}

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: JwtUserPayload, res: Response): string {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
    };
    const token = this.jwtService.sign(payload);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV != 'production',
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'lax',
    });
    console.log('Payload:', user);

    return token;
  }
}
