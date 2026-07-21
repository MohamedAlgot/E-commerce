import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductFactory } from './factory/product.factory';
import { CurrentUser } from 'src/common/decorators/user.decorators';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,private readonly productFactory:ProductFactory) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto,@CurrentUser() user:any) {
    const userId = user.sub;
    
    const createdProduct =  this.productFactory.creatProduct(createProductDto,userId);
    const product = await this.productService.create(createdProduct);
    return{
      message:"product created successfully",
      success:true,
      data:{product}
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
