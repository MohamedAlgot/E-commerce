import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class Address {
  @Prop({ type: String })
  name!: string;

  @Prop({ type: String, require: true })
  phoneNumber!: string;

  @Prop({ type: String, require: true })
  street!: string;

  @Prop({ type: String, require: true })
  city!: string;

  @Prop({ type: String, require: true })
  country!: string;

  @Prop({ type: String })
  details!: string;
}

export const addressSchema = SchemaFactory.createForClass(Address);
