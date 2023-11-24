import { addressMock } from '../../address/__mocks__/address.mock';
import { paymentPixMock } from '../../payment/__mocks__/payment-pix.mock';
import { CreateOrderDto } from '../dtos/CreateOrder.dto';

export const createOrderPixMock: CreateOrderDto = {
  addressId: addressMock.id,
  codePix: paymentPixMock.codePix,
  datePayment: '2023-10-10',
};

export const createOrderCreditCardMock: CreateOrderDto = {
  addressId: addressMock.id,
  amountPayments: 10,
};
