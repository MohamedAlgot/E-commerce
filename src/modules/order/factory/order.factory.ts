import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEnitity } from '../entities/order.entity';
import { OrderStatusEnum } from 'src/common/enum/order-status.enum';
import { PaymentMethodEnum } from 'src/common/enum/payment.enum';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class OrederFactoryService {
  constructor(private readonly configService: ConfigService) {}
  creatOrder(creatOrderDto: CreateOrderDto, dataItemOrder:any) {
    const OrderItem = {
      pId: dataItemOrder._id,
      pName: dataItemOrder.name,

      pPrice: dataItemOrder.price,

      pDiscount: dataItemOrder.discount,

      pFinalPrice: dataItemOrder.finalPrice,

      qunatity: creatOrderDto.quntity,

      subTotla: creatOrderDto.quntity * dataItemOrder.finalPrice,
    };
    const newOrder = new OrderEnitity();

    const fees =
      creatOrderDto.paymentMethod === PaymentMethodEnum.COD
        ? Number(this.configService.get('COD_FEES'))
        : 0;

    newOrder.orderId = String(Math.floor(Math.random() * 1000 + 99999));
    newOrder.orderItems = [OrderItem];
    newOrder.addressId = new Types.ObjectId(creatOrderDto.address);
    newOrder.payment = creatOrderDto.paymentMethod;
    newOrder.status =
      creatOrderDto.paymentMethod == PaymentMethodEnum.COD
        ? OrderStatusEnum.palced
        : OrderStatusEnum.pending;
    newOrder.subTotal = creatOrderDto.quntity * dataItemOrder.finalPrice;
    newOrder.fees =fees;
    newOrder.total = (creatOrderDto.quntity * dataItemOrder.finalPrice +fees);
     

    return newOrder;
  }
}
