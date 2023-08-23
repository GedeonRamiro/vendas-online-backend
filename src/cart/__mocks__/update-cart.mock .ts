import { productMock } from '../../product/__mocks__/product.mock';
import { UpdateCartDTO } from '../dtos/UpdateCart.dto';

export const updateCartMock: UpdateCartDTO = {
  amount: 34,
  productId: productMock.id,
};
