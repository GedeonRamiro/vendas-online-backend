import { orderMock } from '../../order/__mocks__/order.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { OrderProductEntity } from '../entities/order-product.entity';

export const orderProductMock: OrderProductEntity = {
  id: 'ksdlsd-sdkkd',
  amount: 2,
  orderId: orderMock.id,
  price: 543.9,
  productId: productMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
