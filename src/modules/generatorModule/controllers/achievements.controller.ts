import { Body, Controller, Get, Post } from '@nestjs/common';
import { AchievementsService } from '../services/achievements.service';
import { ApiTags } from '@nestjs/swagger';
import ActivityDto from '../../../dtos/ActivityDto';
import { Achievement } from '../../../schemas/achievement.schema';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async getAchievements() {
    return this.achievementsService.getAchievements();
  }

  @Post()
  async addAchievement(@Body() achievement: Achievement) {
    return this.achievementsService.addAchievement(achievement);
  }
}
