import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdatePasswordUserDto {
  @MinLength(6, { message: 'Senha deve ser no mínimo 6 caracteres' })
  @IsString()
  newPassword: string;

  @MinLength(6, { message: 'Senha deve ser no mínimo 6 caracteres' })
  @IsString()
  lastPassword: string;
}
