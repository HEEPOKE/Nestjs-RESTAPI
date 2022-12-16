// import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the User',
    example: 'HEEPOKE',
  })
  id: number;

  @ApiProperty({
    description: 'The name of the User',
    example: 'HEEPOKE',
  })
  username: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'Damon1FX@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  password: string;
}
