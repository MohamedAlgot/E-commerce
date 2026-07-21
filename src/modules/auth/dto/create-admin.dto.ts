import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsName } from 'src/common/dto/valedtion.dto';

export class AdminDto {
  @IsName()
  userName!: string;
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsString()
  @IsNotEmpty()
  password!: string;
  @IsPhoneNumber()
  phoneNumer!: string;
  @IsString()
  Age!: string;
  @IsBoolean()
  isActive!: Boolean;
}
