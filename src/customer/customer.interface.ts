import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CustomerInfo {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
