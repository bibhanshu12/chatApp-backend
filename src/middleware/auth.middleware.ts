import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.module';
import { User } from 'src/types';
import { ApiError } from 'src/common/exceptions/ApiError';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromCookie(req); // or use header-based below

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync<User>(token, {
        secret: jwtConstants.secret,
      });
      //   const payload = await this.jwtService.verifyAsync(token, {
      //     secret: jwtConstants.secret,
      //   });

      console.log(payload);
      req['user'] = payload;

      next();
    } catch (err) {
      throw new ApiError('Invalid or Expired Token!', HttpStatus.CONFLICT, err);
    }
  }

  private extractTokenFromCookie(req: Request): string | undefined {
    return req.cookies?.token as string;
  }

  // 🔁 Optional: Use this instead if you want to support header-based tokens
  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
