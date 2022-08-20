import { ApiProperty } from '@nestjs/swagger';

export default class CategoryDto {
  @ApiProperty({ example: 'best category' })
  name: string;

  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: string;
}
