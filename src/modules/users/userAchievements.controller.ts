import { UserAchievementsService } from './userAchievements.service';
import { Get } from '@nestjs/common';

export class UserAchievementsController {
  constructor(
    private readonly userAchievementsService: UserAchievementsService,
  ) {}

  @Get()
  async getAchievements() {
    return this.userAchievementsService;
  }
}
