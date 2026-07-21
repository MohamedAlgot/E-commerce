import { IsOptional, IsString } from 'class-validator';
import { IsName } from 'src/common/dto/valedtion.dto';

export class CreateCategoryDto {
  @IsName()
  name!: string;
  @IsString()
  slug!: string;
  @IsString()
  @IsOptional()
  logo!: string;
  @IsString()
  folderId!: string;
}
