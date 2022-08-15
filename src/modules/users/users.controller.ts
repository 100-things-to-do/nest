import { UsersService } from './users.service';
import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/:userDeviceId')
  async createNewDeviceRecord(@Param('userDeviceId') userDeviceId: string) {
    return this.userService.createNewDeviceRecord(userDeviceId);
  }

  @Post(
    ':userDeviceId/topics/:topicId/categories/:categoryId/activities/:activityId',
  )
  async revealActivity(
    @Param('userDeviceId') userDeviceId: string,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.userService.revealActivity(
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
    return this.userService.getActivities(userDeviceId, topicId, categoryId);
  }

  @Get()
  async getAchievements() {}

  //TODO: delete below after manuel testing.
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Delete()
  async deleteUsers() {
    return this.userService.deleteUsers();
  }
}
