import { IsEmail, IsString } from 'class-validator';

export class User {
  id?: string;
  name?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
}
