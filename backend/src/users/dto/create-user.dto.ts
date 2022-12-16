import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserUtils } from 'src/utils/user.util';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the User',
    example: 'HEEPOKE',
  })
  // @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email address of the User',
    example: 'Damon1FX@gmail.com',
  })
  // @IsNotEmpty()
  // @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'Password@123',
  })
  // @IsNotEmpty()
  @Length(8, 20)
  // @Matches(UserUtils.PASSWORD_RULE, {
  //   message: UserUtils.PASSWORD_RULE_MESSAGE,
  // })
  password: string;
}
