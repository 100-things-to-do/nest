import { ApiProperty } from '@nestjs/swagger';

export default class ActivityDto {
  @ApiProperty({ example: 'best activity' })
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
