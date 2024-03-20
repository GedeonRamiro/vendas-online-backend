import { ReturnPaymentStatusDTO } from '../../payment-status/dtos/ReturnPaymentStatus.dto';
import { PaymentEntity } from '../entities/payment.entity';

export class ReturnPaymentDTO {
  id: string;
  statusId: string;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ReturnPaymentStatusDTO;

  constructor(payment: PaymentEntity) {
    this.id = payment.id;
    this.statusId = payment.statusId;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.finalPrice;
    this.type = payment.type;
    this.paymentStatus = payment.paymentStatus
      ? new ReturnPaymentStatusDTO(payment.paymentStatus)
      : undefined;
  }
}
