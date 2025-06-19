export interface User {
  name: string;
  nickName: string;
  password?: string;
  email: string;
  bio: string;
  phoneNumber: string;
  gender: Gender;
}

export enum Gender {
  Male,
  Female,
  Other,
}
