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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Activity } from '../../../schemas/activity.schema';
import { Achievement } from '../../../schemas/achievement.schema';
import { AchievementService } from '../services/achievement.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import AchievementDto from '../../../dtos/AchievementDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer';

@ApiTags('achievement')
@Controller(
  'topics/:topicId/categories/:categoryId/activities/:activityId/achievement',
)
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  @ApiOperation({ summary: 'creates achievement, topic doc keeps ref of it' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions))
  async createAchievement(
    @Body() achievementDto: AchievementDto,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
    @UploadedFiles() image,
  ) {
    return this.achievementService.addAchievementToActivity(
      topicId,
      categoryId,
      activityId,
      achievementDto,
      image,
    );
  }
}
