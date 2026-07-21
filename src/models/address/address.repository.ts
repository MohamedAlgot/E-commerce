import { Document, Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Address } from './address.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

type Taddress = Address & Document;
@Injectable()
export class AddressRepository extends AbstractRepository<Taddress> {
  constructor(@InjectModel(Address.name) addressModel:Model<Taddress>) {
    super(addressModel);
  }
}
