import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { IsName } from 'src/common/dto/valedtion.dto';

export class CreateBrandDto {
  @IsName()
  name!: string;
  @IsString()
  logo!: string;
  @IsString()
  @IsOptional()
  folderId!: string;
  @IsString()
  slug!: string;
  @IsArray()
  @IsMongoId({ each: true })
  categories!: string[];
}
