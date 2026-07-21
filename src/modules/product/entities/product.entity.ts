import { Types } from "mongoose";
import { DiscountEnum } from "src/common/enum/discountType.enum";

export class ProductEntity {
      name!: string;
    
      slug!: string;
    
      description!: string;
    
      price!: number;
    
      discount!: number;
    
      discountType!: DiscountEnum;
    
      stock!: number;
      finalPrice!:number;
      mainImage!: string;
    
      subImage!: string[];
    
      colors!: string[];
    
      sizes!: string[];
    
      createdBy!: Types.ObjectId;
    
      updatedBy!: Types.ObjectId;
    
      categoryId!: Types.ObjectId;
    
      subCategoryId!: Types.ObjectId;
    
      brandId!: Types.ObjectId;
}
