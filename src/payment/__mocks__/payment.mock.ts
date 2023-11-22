import { PaymentType } from '../../payment-status/enums/payment-type.enum';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentMock: PaymentEntity = {
  id: 'j023bfke',
  statusId: PaymentType.Done,
  price: 234.5,
  discount: 23,
  finalPrice: 8236,
  type: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
