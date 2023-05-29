import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: string;

  @Column({ name: 'complement', nullable: true })
  complement: string;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @Column({ name: 'number', nullable: false })
  numberAddress: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
