import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { paymentStatusEntity } from './entities/payment.status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([paymentStatusEntity])],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
