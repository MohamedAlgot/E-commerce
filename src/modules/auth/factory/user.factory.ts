import { PasswordHasherService } from 'src/shared/security/password-hasher.service';
import { RegisterAuthDto } from '../dto/signup-customer-auth.dto';
import { RegisterAuth } from '../entities/auth.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactoryService {
  constructor(private readonly passwordhash: PasswordHasherService) {}
  async createRegiterUser(registerAuthDto: RegisterAuthDto) {
    const newUser = new RegisterAuth();

    newUser.UserName = registerAuthDto.UserName.toLowerCase().trim();
    newUser.email = registerAuthDto.email;
    newUser.password = await this.passwordhash.hash(registerAuthDto.password);
    newUser.gender = registerAuthDto.gender;
    newUser.phoneNumber = registerAuthDto.phoneNumber;
    newUser.Age = registerAuthDto.Age;
    return newUser;
  }
}
