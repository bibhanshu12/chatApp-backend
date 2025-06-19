import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaClass, userSchema } from 'src/schemas/user.schemas';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: userSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
