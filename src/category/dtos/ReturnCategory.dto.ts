import { CategoryEntity } from '../entities/category.entity';
export class ReturnCategoryDto {
  id: string;
  name: string;

  constructor(category: CategoryEntity) {
    this.id = category.id;
    this.name = category.name;
  }
}
