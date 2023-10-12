import { IsString, MaxLength, maxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
