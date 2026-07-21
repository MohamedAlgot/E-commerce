import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Customer } from './customer.schema';
import { Model } from 'mongoose';

type Tcustomer = Customer & Document;

export class CustomerRepository extends AbstractRepository<Tcustomer> {
  constructor(@InjectModel(Customer.name) customerModel: Model<Tcustomer>) {
    super(customerModel);
  }
}
