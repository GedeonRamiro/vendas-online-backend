import { categoryMock } from '../../category/__mocks__/category.mock';
import { CountProduct } from '../dtos/CountProduct.dts';

export const countProductMock: CountProduct = {
  category_id: categoryMock.id,
  total: 4,
};
