import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../../entities/Activity';
import { Repository } from 'typeorm';
import { Achievement } from '../../entities/Achievement';
import { User } from '../../entities/User';

@Injectable()
export class AchievementRepository {
  constructor(
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  getAchievementByActivityName(activityName: string) {
    return this.achievementRepository
      .createQueryBuilder('achievement')
      .select('achievement.name as name, achievement.img as img')
      .where('achievement.activityName = :activityName', {
        activityName,
      })
      .getRawOne();
  }

  getUserAchievements(userId: string) {
    return this.achievementRepository
      .createQueryBuilder('achievement')
      .select(
        'achievement.name as name, achievement.img as img, activity.name as activity_name',
      )
      .innerJoin('achievement.activity', 'activity')
      .leftJoin(
        'activity.users',
        'user',
        'user.deviceId = :userId or user.deviceId is null',
        {
          userId,
        },
      )
      .getRawMany();
  }

  delete(achievementName: string) {
    return this.achievementRepository.delete(achievementName);
  }
}
