import { ProductEntity } from '../entities/product.entity';
import { ReturnCategoryDto } from '../../category/dtos/ReturnCategory.dto';

export class ReturnProductDto {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ReturnCategoryDto;

  constructor(product: ProductEntity) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
    this.category = product.category
      ? new ReturnCategoryDto(product.category)
      : undefined;
  }
}
