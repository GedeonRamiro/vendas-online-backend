import { CreateOrderDto } from '../../order/dtos/CreateOrder.dto';
import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: true })
  codePix: string;

  @Column({ name: 'date_payment', nullable: true })
  datePayment: Date;

  constructor(
    statusId: string,
    price: number,
    discount: number,
    finalPrice: number,
    createOrderDTO: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);
    this.codePix = createOrderDTO?.codePix || '';
    this.datePayment = new Date(createOrderDTO?.datePayment || '');
  }
}
