import { Category } from '../Category';
import { ApiProperty } from '@nestjs/swagger';

export class GetDeviceCategoriesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  img: string;
  @ApiProperty()
  categories: Category[];
}
