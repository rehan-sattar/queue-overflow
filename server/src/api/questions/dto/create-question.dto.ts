import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @MinLength(20)
  @MaxLength(200)
  title: string;

  @IsString()
  @MaxLength(1000)
  description: string;
}
