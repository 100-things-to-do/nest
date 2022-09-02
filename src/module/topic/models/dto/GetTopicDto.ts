import { ApiProperty } from '@nestjs/swagger';

export class GetTopicDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  img: string;
}
