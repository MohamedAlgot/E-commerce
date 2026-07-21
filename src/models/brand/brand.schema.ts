import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Brand {
  @Prop({ type: String, require: true, trim: true })
  name!: string;

  @Prop({ type: String, require: true, trim: true })
  slug!: string;

  @Prop({ type: String })
  logo!: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categoryId!: Types.ObjectId[];
}

export const brandSchema = SchemaFactory.createForClass(Brand);
