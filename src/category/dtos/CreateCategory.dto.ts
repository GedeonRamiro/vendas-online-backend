import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(3, { message: 'Nome muito curto' })
  @IsString()
  name: string;
}
