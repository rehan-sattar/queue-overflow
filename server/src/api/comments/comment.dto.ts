import { IsString, MaxLength } from 'class-validator';

export class CommentDto {
  @IsString()
  @MaxLength(500)
  contents: string;
}
