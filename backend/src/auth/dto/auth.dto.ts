import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @MinLength(8)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
