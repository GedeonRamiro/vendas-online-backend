import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  categoryId: string;

  @MinLength(3, { message: 'Nome muito curto' })
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  image: string;
}
