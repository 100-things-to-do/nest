import { ApiProperty } from '@nestjs/swagger';

export class GetActivitiesDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  img: string;
  @ApiProperty()
  device_id: string;
}
