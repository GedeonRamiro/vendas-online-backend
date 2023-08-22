import { productMock } from '../../product/__mocks__/product.mock';
import { InsertCartDTO } from '../dtos/InsertCart.dto';

export const insertCartMock: InsertCartDTO = {
  amount: 34,
  productId: productMock.id,
};
