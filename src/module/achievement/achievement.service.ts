import { Injectable } from '@nestjs/common';
import { AchievementRepository } from './achievement.repository';

@Injectable()
export class AchievementService {
  constructor(private readonly achievementRepository: AchievementRepository) {}

  getAchievementByActivityName(activityName: string) {
    return this.achievementRepository.getAchievementByActivityName(
      activityName,
    );
  }

  getAchievements(userId: string) {
    return this.achievementRepository.getUserAchievements(userId);
  }

  delete(achievementName: string) {
    return this.achievementRepository.delete(achievementName);
  }
}
