import { Types } from 'mongoose';
import { OrderStatusEnum } from 'src/common/enum/order-status.enum';
import { PaymentMethodEnum } from 'src/common/enum/payment.enum';
import { OrderItem } from 'src/models/order/order.schema';

export class OrderEnitity {

  orderId!:string;

  payment!: PaymentMethodEnum;

  addressId!: Types.ObjectId;

  invoicelink!: string;

  status!: OrderStatusEnum;


  orderItems!:OrderItem[]
  
  subTotal!:number;

  fees!:number;

  total!:number;
}
