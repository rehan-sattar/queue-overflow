import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

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
}
