import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactoryService } from './factory/category.factory';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category= this.categoryFactoryService.creatCategory(createCategoryDto);
    const createCategory= await this.categoryService.create(category);
    return {
      message:"Category created successfully.",
      success:true,
      data:{createCategory}     
    }
    
  }



  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category= await this.categoryService.findOne(id);
    return {
      message:"success",
      success:true,
      data:{category}
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
