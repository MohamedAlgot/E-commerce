import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/signup-customer-auth.dto';
import { CustomerRepository } from 'src/models/customer/customer.repository';
import { UserFactoryService } from './factory/user.factory';
import { MailService } from 'src/shared/mailer/mail.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PasswordHasherService } from 'src/shared/security/password-hasher.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly userFactoryService: UserFactoryService,
    private readonly mailService: MailService,
    private readonly jwtservice:JwtService,
    private readonly passwordHash:PasswordHasherService,
    @Inject(CACHE_MANAGER) private readonly cacheManger: Cache,
  ) {}
  async create(registerAuthDto: RegisterAuthDto) {
    //1. check user exist ..inject userRepository to AuthService
    const CustomerExist = await this.customerRepository.getOne({
      email: registerAuthDto.email,
    });
    //2. if yes >> throw error >user already exist
    if (CustomerExist) {
      throw new NotFoundException('user already Exists !.');
    }
    //3. hash-password [prepare data]
    const createdUser =
      await this.userFactoryService.createRegiterUser(registerAuthDto);
    //4. send mail with otp to verify
    const otp = Math.floor(Math.random() * 100000 + 9999);
    await this.mailService.send({
      to: registerAuthDto.email,
      subject: 'verify your account',
      html: `<p>your otp verify is ${otp}</p>`,
    });
    //5. save otp and  userDate into Cache
    await this.cacheManger.set(
      `otp${registerAuthDto.email}`,
      otp,
      3 * 24 * 60 * 60 * 1000,
    );
    //create user into redis
    await this.cacheManger.set(
      registerAuthDto.email,
      JSON.stringify(createdUser),
      10 * 60 * 1000,
    );
    console.log(createdUser);
  }
  async VerifyAccount(verifyAccountDto: VerifyAccountDto) {
    //6. when verify account >> create User into  DB,remove OTP
    const userData = await this.cacheManger.get<string>(verifyAccountDto.email);
    console.log(userData);
    console.log(verifyAccountDto.email);

    if (!userData) {
      throw new NotFoundException('user Not found');
    }
    const otp = await this.cacheManger.get(`otp${verifyAccountDto.email}`);
    if (!otp) {
      throw new BadRequestException('expire otp');
    }
    if (verifyAccountDto.otp != otp) {
      throw new BadRequestException('invalid otp');
    }
    console.log(userData);

    const user = await this.customerRepository.create(JSON.parse(userData));

    await this.cacheManger.del(verifyAccountDto.email);
    await this.cacheManger.del(`${verifyAccountDto.email}`);
    return user;
  }
  async login(loginAuthDto: LoginAuthDto) {
    //1.check userEixst
    const userExist = await this.customerRepository.getOne({
      email: loginAuthDto.email,
    });
    // if No ,throw erro user not found
    if (!userExist) {
      throw new NotFoundException('user not found');
    }
    //check email and password correct or not correct
   const comp=await this.passwordHash.compare(loginAuthDto.password,userExist.password)



    if(!comp){
      throw new BadRequestException("password and email not falid");
    }
    // if correct ,generate token >>nest js/jwt [jwtModule (setup/register),JWTservice(sign,verify)]
    const accessToken=this.jwtservice.sign({
      sub:userExist._id,
      role:userExist['role']
    })

      const refreshToken = this.jwtservice.sign(
      { sub: userExist._id, role: userExist['role'] },
      { expiresIn: '7d' })
    
      return {accessToken,refreshToken}
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
