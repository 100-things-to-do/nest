import { ApiProperty } from '@nestjs/swagger';

export class GetPopularCategoriesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  click: number;
  @ApiProperty()
  img: string;
}
