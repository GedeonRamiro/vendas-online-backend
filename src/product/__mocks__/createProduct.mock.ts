import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dtos/CreateProduct.dto';

export const createProductMock: CreateProductDto = {
  categoryId: categoryMock.id,
  image: 'lkfdjsafkldsa',
  name: 'name mock product',
  price: 25.0,
};
