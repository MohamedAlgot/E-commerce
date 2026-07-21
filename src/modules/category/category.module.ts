import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryFactoryService } from './factory/category.factory';
import { CategoryRepository } from 'src/models/category/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from 'src/models/category/category.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Category.name,schema:categorySchema},
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryFactoryService,CategoryRepository],
  exports:[CategoryRepository]
})
export class CategoryModule {}
