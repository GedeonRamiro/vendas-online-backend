import { OrderEntity } from '../../order/entities/order.entity';
import { paymentStatusEntity } from '../../payment-status/entities/payment.status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'status_id', nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'discount', nullable: false })
  discount: number;

  @Column({ name: 'final_price', nullable: false })
  finalPrice: number;

  @Column({ name: 'type', nullable: false })
  type: string;

  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrderEntity, (order) => order.payment)
  orders?: OrderEntity[];

  @ManyToOne(() => paymentStatusEntity, (payment) => payment.payments)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  paymentStatus?: paymentStatusEntity;
}
