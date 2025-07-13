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
    console.log(email);
    const user= await this.userModel.findOne({email}).select('-password').sort({createdAt:-1});
    if(!user){
        throw new ConflictException("No users found, Create one!")
    }
    return user;
  }

  async allUser(){
    const users=await this.userModel.find()
    .select('-password')
    .sort({ createdAt: -1 });
    return users;
  }

  async createUser(user:User){
    const userd= await this.userModel.findOne({email:user.email});
    if(userd){
        throw new ConflictException("User already Exists! ");
    }
    const saveUser= await this.userModel.create(user);

    return saveUser;
  }


      async updateUser(userId:string){
        const user=  await this.userModel.findById(userId);
        if(!user){
          throw new ConflictException('User not found! ');
        }
        
      }
  



}
