import { CategoryEntity } from '../entities/category.entity';
export class ReturnCategoryDto {
  id: string;
  name: string;
  amountProducts?: number;

  constructor(category: CategoryEntity, amountProducts?: number) {
    this.id = category.id;
    this.name = category.name;
    this.amountProducts = amountProducts;
  }
}
