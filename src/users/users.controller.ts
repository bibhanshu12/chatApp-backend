import { Body, Controller, Get, Put, Req } from '@nestjs/common';
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
  @Put('update')
  updatePhoto(@Req() req:Request,@Body('userPhoto') userPhoto:File){
    const userId=req['user']._id;

    return this.userService.updateUser(userId);
  }


}
