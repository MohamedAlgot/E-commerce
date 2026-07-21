import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { Order } from './order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type TOrder = Document & Order;

@Injectable()
export class OrderRepository extends AbstractRepository<TOrder> {
  constructor(@InjectModel(Order.name) OrderModel: Model<TOrder>) {
    super(OrderModel);
  }
}
