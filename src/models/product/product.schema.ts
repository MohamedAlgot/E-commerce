import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { DiscountEnum } from 'src/common/enum/discountType.enum';

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, require: true, trim: true })
  name!: string;

  @Prop({ type: String, require: true, trim: true })
  slug!: string;

  @Prop({ type: String })
  description!: string;

  @Prop({ type: Number, require: true })
  price!: number;



  @Prop({ type: Number, require: true })
  discount!: number;

  @Prop({ type: String})
  discountType!: DiscountEnum;

  @Prop({ type: Number, require: true })
  stock!: number;

  @Prop({ type: String, require: true })
  mainImage!: string;

  @Prop({ type: [String], require: true })
  subImage!: string[];

  @Prop({ type: [String] })
  colors!: string[];

  @Prop({ type: [String] })
  sizes!: string[];

    @Prop({type:Number,default:function(this:Product){
      if(this.discountType==="fixedAmount"){
        return this.price - this.discount
      }
      else if(this.discountType==="percentage"){
        return this.price - (this.discount*this.price)/100;
      }
      return this.price
  }})
  finalPrice!:number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true  })
  createdBy!: Types.ObjectId;

  @Prop({ type : mongoose.Schema.Types.ObjectId, ref: 'User',require:true })
  updatedBy!: Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categoryId!: Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  })
  subCategoryId!: Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }] })
  brandId!: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
