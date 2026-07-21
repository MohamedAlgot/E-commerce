import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from 'src/models/product/product.repository';
import { ProductEntity } from './entities/product.entity';
import { CategoryRepository } from 'src/models/category/category.repository';
import { BrandRepository } from 'src/models/brand/brand.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly brandRepository:BrandRepository
  ) {}
  async create(product: ProductEntity) {
    //1.check product Existence
    const productExist = await this.productRepository.getOne({
      name: product.name,
    });
    //2.if yes , update stock for business wise
    if (productExist) {
      const updatedProduct = await this.productRepository.updateOne(
        { _id: productExist._id },
        { $inc: { stock: 1 } } 
      );
      return updatedProduct;
    }
    //3.check category existence into DB
    const categoryExist= await this.categoryRepository.getOne({_id:product.categoryId});
    if(!categoryExist){throw new NotFoundException('Category Not found')};
    //4. check brand existence into DB
    const brandExist= await this.brandRepository.getOne({_id:product.brandId});
    if(!brandExist){throw new NotFoundException('Brand Not found')};
    //5. prepare data >> productFactory >>todo :createdBy,UpdatedBy >> tokens 
    //6.create product
    return await this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
