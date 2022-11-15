import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;
}
