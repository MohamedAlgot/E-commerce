import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, addressSchema } from 'src/models/address/address.schema';
import { AddressRepository } from 'src/models/address/address.repository';
import { addressFactoryService } from './factory/address.factory';

@Module({
  imports:[MongooseModule.forFeature([{name:Address.name,schema:addressSchema}])],
  controllers: [AddressController],
  providers: [AddressService,AddressRepository,addressFactoryService],
})
export class AddressModule {}
