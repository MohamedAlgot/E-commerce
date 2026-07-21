import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsName } from 'src/common/dto/valedtion.dto';
import { Role } from 'src/common/enum/discountType.enum';
import { genderEnum } from 'src/common/enum/gender.enum';

export class RegisterAuthDto {
  @IsName()
  UserName!: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsPhoneNumber('EG')
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
  @IsNumber()
  @IsNotEmpty()
  Age!: number;
  @IsEnum(genderEnum)
  gender!: genderEnum;
  role!: Role;
}
