import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  role: string;
}
