import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';

type TAdmin = Admin & Document;

export class AdminRepository extends AbstractRepository<TAdmin> {
  constructor(@InjectModel(Admin.name) AdminModel: Model<TAdmin>) {
    super(AdminModel);
  }
}
