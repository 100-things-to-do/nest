import { Body, Controller, Get, Post } from '@nestjs/common';
import { AchievementsService } from '../services/achievements.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import ActivityDto from '../../../dtos/ActivityDto';
import { Achievement } from '../../../schemas/achievement.schema';

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
