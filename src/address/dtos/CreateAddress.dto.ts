import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsOptional()
  @IsString()
  complement: string;

  @IsString()
  cep: string;

  @IsNumber()
  numberAddress: number;

  @IsString()
  cityId: string;
}
