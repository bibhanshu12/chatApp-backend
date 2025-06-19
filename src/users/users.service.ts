import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSchemaClass } from 'src/schemas/user.schemas';
import { User } from 'src/types';

//prettier-ignore
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private userModel: mongoose.Model<UserSchemaClass>,
  ) {}


  async findByEmail(email:string){
    const user= await this.userModel.findOne({email})
    if(!user){
        throw new ConflictException("No users found, Create one!")
    }
    return user;
  }


  async createUser(user:User){
    const userd= await this.userModel.findOne({email:user.email});
    if(userd){
        throw new ConflictException("User already Exists! ");
    }
    const saveUser= await this.userModel.create(user);

    return saveUser;
  }


  



}
