import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
  id: number;

  // @IsNotEmpty()
  username: string;

  // @IsNotEmpty()
  // @IsEmail()
  email: string;

  // @IsNotEmpty()
  // @Length(8, 20)
  password: string;

  role: string;
}
