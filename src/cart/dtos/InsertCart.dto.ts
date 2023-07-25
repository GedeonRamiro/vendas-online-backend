import { IsNumber, IsString } from 'class-validator';

export class InsertCartDTO {
  @IsString()
  productId: string;

  @IsNumber()
  amount: number;
}
