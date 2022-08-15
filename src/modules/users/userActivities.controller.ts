import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserActivitiesService } from './userActivities.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserActivities')
@Controller(
  'users/:userDeviceId/topics/:topicId/categories/:categoryId/activities',
)
export class UserActivitiesController {
  constructor(private readonly userActivitiesService: UserActivitiesService) {}

  @Post(
    ':userDeviceId/topics/:topicId/categories/:categoryId/activities/:activityId',
  )
  async revealActivity(
    @Param('userDeviceId') userDeviceId: string,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.userActivitiesService.revealActivity(
      userDeviceId,
      topicId,
      categoryId,
      activityId,
    );
  }

  @Get(':userDeviceId/topics/:topicId/categories/:categoryId/activities')
  async getActivities(
    @Param('userDeviceId') userDeviceId: string,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.userActivitiesService.getActivities(
      userDeviceId,
      topicId,
      categoryId,
    );
  }
}
