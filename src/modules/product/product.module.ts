import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/product/product.schema';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { ProductRepository } from 'src/models/product/product.repository';
import { ProductFactory } from './factory/product.factory';

@Module({
  imports: [
    //registration category model to DB
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoryModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, ProductFactory],
  exports:[ProductRepository]
})
export class ProductModule {}
