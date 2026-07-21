import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { IsName, IsValidDiscount } from 'src/common/dto/valedtion.dto';
import { DiscountEnum } from 'src/common/enum/discountType.enum';

export class CreateProductDto {
  @IsName()
  name!: string;

  // @IsString()
  // slug!: string;

  @IsName(20, 1000)
  description!: string;

  @IsNumber()
  @Min(1)
  price!: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => value ?? 1)
  stock!: number;

  @IsString()
  @IsNotEmpty()
  mainImage!: string;

  @IsString({ each: true })
  @IsArray()
  subImage!: string[];

  @IsString({ each: true })
  @IsArray()
  colors!: string[];




  @IsString({ each: true })
  @IsArray()
  sizes!: string[];

  @IsValidDiscount()
  discount!: number;

  @IsString()
  @IsEnum(DiscountEnum)
  @IsOptional()
  discountType!: DiscountEnum;

  // @IsString()
  // // createdBy!: string;

  // @IsString()
  // updatedBy!: string;

  @IsMongoId()
  categoryId!: string;

  @IsMongoId()
   subCategoryId!: string;

  @IsMongoId()
    brandId!: string;
}
