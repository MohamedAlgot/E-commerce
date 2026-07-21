import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { OrderStatusEnum } from 'src/common/enum/order-status.enum';
import { PaymentMethodEnum } from 'src/common/enum/payment.enum';

@Schema()
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  pId!: Types.ObjectId;
  @Prop({ type: String, require: true })
  pName!: string;
  @Prop({ type: Number, require: true })
  pPrice!: number;
  @Prop({ type: Number, require: true })
  pDiscount!: number;
  @Prop({ type: Number, require: true })
  pFinalPrice!: number;
  @Prop({ type: Number, require: true })
  qunatity!: number;
  @Prop({ type: Number, require: true })
  subTotla!: number;
}

@Schema({ timestamps: true })
export class Order {
  _id!: Types.ObjectId;

  @Prop({ type: String, require: true })
  orderId!: string;

  @Prop({ type: String, enum: PaymentMethodEnum })
  payment!: PaymentMethodEnum;

  @Prop({ type: mongoose.Schema.Types.ObjectId, require: true })
  addressId!: Types.ObjectId;

  @Prop({ type: String })
  invoicelink!: string;

  @Prop({ type: String, enum: OrderStatusEnum })
  status!: OrderStatusEnum;

  @Prop({ type: [OrderItem] })
  orderItems!: OrderItem[];

  @Prop({ type: Number })
  subTotal!: number;

  @Prop({ type: Number })
  fees!: number;

  @Prop({ type: Number })
  total!: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
