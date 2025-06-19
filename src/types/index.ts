export interface User {
  name: string;
  nickName: string;
  password?: string;
  email: string;
  bio: string;
  phoneNumber: number;
  gender: Gender;
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}
