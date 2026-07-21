import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, brandSchema } from 'src/models/brand/brand.schema';
import { BrandFactoryServise } from './factory/brand.factory';
import { BrandRepository } from 'src/models/brand/brand.repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }]),
    CategoryModule
  ],
  controllers: [BrandController],
  providers: [BrandService,BrandRepository,BrandFactoryServise],
  exports:[BrandRepository]
})
export class BrandModule {}
