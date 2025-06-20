import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, UserSchemaClass } from 'src/schemas/user.schemas';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './utils/generateToken';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default-secret-key',
};

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: userSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [JwtTokenService],
})
export class AuthModule {}
