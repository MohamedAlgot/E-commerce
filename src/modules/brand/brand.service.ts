import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from 'src/models/brand/brand.repository';
import { CategoryRepository } from 'src/models/category/category.repository';

@Injectable()
export class BrandService {
  constructor(
    private readonly brandRebository: BrandRepository,
    private readonly categoryRebository: CategoryRepository,
  ) {}
  async create(brand: Brand) {
    //check Existence
    const brandExist = await this.brandRebository.getOne({ name: brand.name });
    //if yes,throw new error
    if (brandExist) throw new ConflictException('brand already Exists');

    const categories = await this.categoryRebository.getAll({
      _id: { $in: brand.categoryId },
    });

    if (categories.length != brand.categoryId.length)
      throw new NotFoundException('some category Not found');

    return await this.brandRebository.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
