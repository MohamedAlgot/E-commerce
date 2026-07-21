import { Types } from 'mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductEntity } from '../entities/product.entity';
import slugify from 'slugify';

export class ProductFactory {
  creatProduct(creatProductDto: CreateProductDto, userId) {
    const newProduct = new ProductEntity();

    newProduct.name = creatProductDto.name.toLowerCase().trim();
    newProduct.slug = slugify(creatProductDto.name);
    newProduct.brandId = new Types.ObjectId(creatProductDto.brandId);
    newProduct.categoryId = new Types.ObjectId(creatProductDto.categoryId);
    newProduct.colors = creatProductDto.colors;
    newProduct.description = creatProductDto.description;
    newProduct.discount = creatProductDto.discount;
    newProduct.mainImage = creatProductDto.mainImage;
    newProduct.sizes = creatProductDto.sizes;
    newProduct.discountType = creatProductDto.discountType;
    newProduct.price = creatProductDto.price;
    newProduct.stock = creatProductDto.stock;
    newProduct.subCategoryId = new Types.ObjectId(
      creatProductDto.subCategoryId,
    );
    newProduct.subImage = creatProductDto.subImage;
    newProduct.updatedBy = userId;
    newProduct.createdBy = userId;

    return newProduct;
  }
}
