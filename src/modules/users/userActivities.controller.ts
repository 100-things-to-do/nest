import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserActivitiesService } from './userActivities.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('UserActivities')
@Controller('users/:deviceId/topics/:topicId/categories/:categoryId/activities')
export class UserActivitiesController {
  constructor(private readonly userActivitiesService: UserActivitiesService) {}

  @Patch('/:activityId')
  @ApiOperation({ summary: 'Reveals activity' })
  async revealActivity(
    @Param('deviceId') deviceId: string,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.userActivitiesService.revealActivity(
      deviceId,
      topicId,
      categoryId,
      activityId,
    );
  }

  @Get()
  async getActivities(
    @Param('deviceId') deviceId: string,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.userActivitiesService.getActivities(
      deviceId,
      topicId,
      categoryId,
    );
  }
}
