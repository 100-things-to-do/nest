import { Controller, Get } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @ApiOperation({ summary: 'Get achievements with details' })
  async getAchievements() {
    return this.achievementsService.getAchievements();
  }
}
