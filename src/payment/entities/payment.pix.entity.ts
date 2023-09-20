import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

@ChildEntity()
export abstract class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'date_payment' })
  datePayment: Date;
}
