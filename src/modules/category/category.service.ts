import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/models/category/category.repository';
import { Category } from './entities/category.entity';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(category: Category) {
    //check existence
    const categoryExist = await this.categoryRepository.getOne({
      name: category.name,
    });
    //if yes, throw error
    if (categoryExist) {
      throw new ConflictException('Category  already exists');
    }
    //
    return await this.categoryRepository.create(category);
  }
   
  async findOne(id:string) {
    const getCategory= await this.categoryRepository.getOne({_id:id});
    if (!getCategory) {
      throw new NotFoundException("not found category")
    }
    return getCategory;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
