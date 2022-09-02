import { ApiProperty } from '@nestjs/swagger';

export class GetAchievementDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  img: string;
}
