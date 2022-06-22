import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { Tag } from 'src/api/tags/tags-base.entity';

export class UpdateUserDTO {
  @MaxLength(40)
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profilePhoto?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  twitterHandle?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  githubHandle?: string;

  @IsArray()
  @IsOptional()
  tags?: Tag[];
}
