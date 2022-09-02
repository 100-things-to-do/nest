import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicRequest {
  @ApiProperty()
  name: string;
}
