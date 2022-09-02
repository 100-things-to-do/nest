import { ApiProperty } from '@nestjs/swagger';

export class GetCategoryDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  img: string;
}
