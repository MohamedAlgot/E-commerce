import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from 'src/models/address/address.repository';
import { addressFactoryService } from './factory/address.factory';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository,private readonly addressFactoryService:addressFactoryService) {}
  async create(createAddressDto: CreateAddressDto) {
    //Check that the user exists.
    //Check that the address is not duplicated.
    const addressExist = await this.addressRepository.getOne({
      name: createAddressDto.name,
    });
    if(addressExist){
      throw new BadRequestException("address already Exist");
    }
    const createdAddress =  this.addressFactoryService.createAddress(createAddressDto);

    return await this.addressRepository.create(createdAddress);
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
