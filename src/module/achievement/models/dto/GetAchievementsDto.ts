import { ApiProperty } from '@nestjs/swagger';

export class GetAchievementsDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  activity_name: string;
}
