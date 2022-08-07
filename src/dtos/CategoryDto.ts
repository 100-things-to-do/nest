import { ApiProperty } from '@nestjs/swagger';

export default class CategoryDto {
  @ApiProperty({ example: 'best category' })
  name: string;
}
