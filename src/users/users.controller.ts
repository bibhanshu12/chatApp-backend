import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('find')
  findUser(
    @Body('email')
    email: string,
  ) {
    return this.userService.findByEmail(email);
  }

  @Get('all')
  findAllUser() {
    return this.userService.allUser();
  }
}
