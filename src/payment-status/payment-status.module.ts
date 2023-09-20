import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { paymentStatus } from './entities/payment.status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([paymentStatus])],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
