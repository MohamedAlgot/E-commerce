import { Types } from 'mongoose';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { Brand } from '../entities/brand.entity';
import slugify from 'slugify';

export class BrandFactoryServise {
  CreateBrand(creatBrandDto: CreateBrandDto) {
    const newBrand = new Brand();

    newBrand.name = creatBrandDto.name.toLowerCase();
    newBrand.logo = creatBrandDto.logo;
    newBrand.folderId = creatBrandDto.folderId;
    newBrand.slug = slugify(creatBrandDto.name);
    newBrand.categoryId = creatBrandDto.categories.map((id) =>
     new Types.ObjectId(id),
    );
    return newBrand;
  }
}
