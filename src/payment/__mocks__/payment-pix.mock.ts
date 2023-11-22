import { PaymentPixEntity } from '../entities/payment.pix.entity';
import { paymentMock } from './payment.mock';

export const paymentPixMock: PaymentPixEntity = {
  ...paymentMock,
  codePix: 'sddsl4389ksld',
  datePayment: new Date(),
};
