import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'exapmle@gmail.com',
  })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 4,
  })
  @IsNotEmpty()
  @ApiProperty({
    example: '1234@ImStrongPassword',
    description: 'minLength: 8; minNumbers: 4; minUppercase: 1; minNumbers: 1; minSymbols: 1;',
  })
  password: string;
}
