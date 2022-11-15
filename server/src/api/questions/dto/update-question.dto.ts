import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Tag } from 'src/api/tags/tags-base.entity';

export class UpdateQuestionDto {
  @IsString()
  @MinLength(20)
  @MaxLength(200)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsArray()
  @IsOptional()
  tags?: Tag[];
}
