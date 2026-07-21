import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductModule } from '../product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/models/order/order.schema';
import { OrderRepository } from 'src/models/order/order.repository';
import { OrederFactoryService } from './factory/order.factory';
import { ProductRepository } from 'src/models/product/product.repository';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    PaymentModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrederFactoryService],
  exports: [OrderRepository],
})
export class OrderModule {}
