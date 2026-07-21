import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import slugify from 'slugify';

@Injectable()
export class CategoryFactoryService {
  creatCategory(createCategoryDto: CreateCategoryDto) {
    const newcategory = new Category();
    newcategory.name = createCategoryDto.name.toLowerCase();
    newcategory.slug = slugify(createCategoryDto.name); // trim,replacement,translate
    newcategory.logo = createCategoryDto.logo;
    newcategory.folderId = createCategoryDto.folderId;
    return newcategory;
  }
  updateCategory() {}
}
