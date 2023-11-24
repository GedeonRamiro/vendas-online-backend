import { addressMock } from '../../address/__mocks__/address.mock';
import { paymentMock } from '../../payment/__mocks__/payment.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { OrderEntity } from '../entities/order.entity';

export const orderMock: OrderEntity = {
  addressId: addressMock.id,
  createdAt: new Date(),
  date: new Date(),
  id: 'jsdhbd-sbdkcb3d-dl',
  paymentId: paymentMock.id,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
