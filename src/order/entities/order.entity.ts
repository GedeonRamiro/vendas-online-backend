import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'address_id', nullable: false })
  addressId: string;

  @Column({ name: 'date', nullable: false })
  date: Date;

  @Column({ name: 'payment_id', nullable: false })
  paymentId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
