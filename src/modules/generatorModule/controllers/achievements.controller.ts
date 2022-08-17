import { Controller, Get } from '@nestjs/common';
import { AchievementsService } from '../services/achievements.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async getAchievements() {
    return this.achievementsService.getAchievements();
  }
}
