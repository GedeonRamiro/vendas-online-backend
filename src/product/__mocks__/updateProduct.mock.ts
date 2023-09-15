import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dtos/CreateProduct.dto';
import { UpdateProductDto } from '../dtos/UpdateProduct.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  image: 'lkfdjsafkldsa',
  name: 'name mock product',
  price: 25.0,
};
