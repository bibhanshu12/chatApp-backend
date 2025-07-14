import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

@Schema({
  timestamps: true,
})
export class UserSchemaClass {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  nickName: string;
  @Prop({ required: false })
  bio: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: false })
  profileUrl: string;
}

export const userSchema = SchemaFactory.createForClass(UserSchemaClass);
