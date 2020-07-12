import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(8)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  role: string;
}
