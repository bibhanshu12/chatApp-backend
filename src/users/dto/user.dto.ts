import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/types';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly nickName: string;

  @IsEmail()
  readonly email: string;
  @IsString()
  readonly bio: string;
  @IsNumber()
  readonly phoneNumber: number;

  @IsIn(['Male', 'Female', 'Other'])
  readonly gender: Gender;

  @MinLength(6)
  readonly password: string;
}
export class SignInUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
