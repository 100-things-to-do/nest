import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Activity } from '../../../schemas/activity.schema';
import { Achievement } from '../../../schemas/achievement.schema';
import { AchievementService } from '../services/achievement.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('achievement')
@Controller(
  'topics/:topicId/categories/:categoryId/activities/:activityId/achievement',
)
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  async createAchievement(
    @Body() achievementDto: Achievement,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.achievementService.addAchievementToActivity(
      topicId,
      categoryId,
      activityId,
      achievementDto,
    );
  }

  @Get()
  async getAchievement(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.achievementService.getAchievement(
      topicId,
      categoryId,
      activityId,
    );
  }

  @Put()
  async update(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
    @Body() achievement: Achievement,
  ) {
    return this.achievementService.update(
      topicId,
      categoryId,
      activityId,
      achievement,
    );
  }

  @Delete()
  async delete(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.achievementService.delete(topicId, categoryId, activityId);
  }
}
