import { IsOptional, IsString, MaxLength } from 'class-validator';

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
}
