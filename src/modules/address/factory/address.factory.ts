import { Address } from 'src/models/address/address.schema';
import { CreateAddressDto } from '../dto/create-address.dto';

export class addressFactoryService {
  createAddress(creatAddressDto: CreateAddressDto) {
    const newAdderss = new Address();

    newAdderss.name = creatAddressDto.name.toLowerCase();
    newAdderss.city = creatAddressDto.city;
    newAdderss.country = creatAddressDto.country;
    newAdderss.street = creatAddressDto.street;
    newAdderss.phoneNumber = creatAddressDto.phoneNumber;
    newAdderss.details = creatAddressDto.details;
    return newAdderss;
  }
}
