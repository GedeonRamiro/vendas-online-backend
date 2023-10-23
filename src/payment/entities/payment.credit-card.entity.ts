import { CreateOrderDto } from '../../order/dtos/CreateOrder.dto';
import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payments', nullable: true })
  amountPayments: number;

  constructor(
    statusId: string,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDTO: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrderDTO?.amountPayments || 0;
  }
}
