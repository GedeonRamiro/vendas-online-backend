import { CategoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dtos/CreateProduct.dto';

export const createProductMock: CreateProductDto = {
  categoryId: CategoryMock.id,
  image: 'lkfdjsafkldsa',
  name: 'name mock product',
  price: 25.0,
};
