import { IsArray } from 'class-validator';

export class AssignTagsDto {
  @IsArray()
  tagIds: number[];
}
