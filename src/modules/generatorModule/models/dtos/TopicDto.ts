import { ApiProperty } from '@nestjs/swagger';

export default class TopicDto {
  @ApiProperty({ example: 'best topic' })
  name: string;
}
