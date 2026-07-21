import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/signup-customer-auth.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IsPublic } from 'src/common/decorators/public.decorators';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("sign-up")
 async createSignUp(@Body() registerAuthDto:RegisterAuthDto) {
     await this.authService.create(registerAuthDto);
      return{
        message:"user created successfully",
        success:true
      }
  }
    @Post("verify-account")
    async verify(@Body() verrifyAccountDto:VerifyAccountDto){
      const createdUser=await this.authService.VerifyAccount(verrifyAccountDto);
      return{
        mesaage:"user verified successfully",
        data:createdUser,
      }
    }

    @Post('login')
    async createLogin(@Body() loginAuthDto:LoginAuthDto){
      const objResult= await this.authService.login(loginAuthDto);
      return{
        message:"login successfully",
        success:true,
        data:{objResult}
      }
    }


  }
