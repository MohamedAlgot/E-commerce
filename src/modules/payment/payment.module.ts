
import { Module } from '@nestjs/common';
import { KashierService } from './payment.service';

@Module({
  providers: [KashierService],
  exports: [KashierService],
})
export class PaymentModule {}