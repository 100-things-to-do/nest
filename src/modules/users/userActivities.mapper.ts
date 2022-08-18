import { Injectable } from '@nestjs/common';
import { Activity } from '../../schemas/activity.schema';

@Injectable()
export class UserActivitiesMapper {
  constructor() {}

  public mapToUserActivities(
    activities: Activity[],
    totalAchievements: number,
    achievedAchievements: number,
  ) {
    return {
      activities,
      totalAchievements,
      achievedAchievements,
    };
  }
}
