import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, { message: 'Nome muito curto' })
  @IsString()
  name: string;

  @IsEmail(undefined, { message: 'Formato de e-mail digitado não é valido' })
  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  cpf: string;

  @MinLength(6, { message: 'Senha deve ser no mínimo 6 caracteres' })
  @IsString()
  password: string;
}
