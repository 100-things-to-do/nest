import { Activity } from '../../../../schemas/activity.schema';

export class UserActivitiesResponseDto {
  achievedAchievements: number;
  totalAchievements: number;
  activities: Activity[];
}