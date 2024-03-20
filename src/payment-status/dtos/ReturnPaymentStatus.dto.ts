import { PaymentStatusEntity } from '../entities/payment.status.entity';

export class ReturnPaymentStatusDTO {
  id: string;
  name: string;

  constructor(paymentStatus: PaymentStatusEntity) {
    this.id = paymentStatus.id;
    this.name = paymentStatus.name;
  }
}
