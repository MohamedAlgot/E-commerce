import { Document, Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Product } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

type Tproduct = Product & Document;
@Injectable()
export class ProductRepository extends AbstractRepository<Tproduct> {
  constructor(@InjectModel(Product.name) categoryModel: Model<Tproduct>) {
    super(categoryModel);
  }
}
