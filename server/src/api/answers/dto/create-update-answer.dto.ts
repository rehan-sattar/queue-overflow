import { IsString } from 'class-validator';

export class CreateUpdateAnswerDto {
  @IsString()
  contents: string;
}
