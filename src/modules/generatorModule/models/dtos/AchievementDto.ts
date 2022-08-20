import { ApiProperty } from '@nestjs/swagger';

export default class AchievementDto {
  @ApiProperty({ example: 'best achievement' })
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
