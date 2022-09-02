import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../../entities/Activity';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Category } from '../../entities/Category';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  getRevealedActivitiesByCategoryName(categoryName: string, userId: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .select('activity.name, activity.img, user.device_id')
      .leftJoin(
        'activity.users',
        'user',
        'user.deviceId = :userId OR user.deviceId is null',
        { userId },
      )
      .where('activity.categoryName = :categoryName', {
        categoryName,
      })

      .getRawMany();
  }

  getActivitiesByCategoryName(categoryName: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .where('activity.categoryName = :categoryName', { categoryName })
      .getMany();
  }

  createActivity(categoryName, body) {
    const activity = new Activity();
    activity.category = categoryName;
    activity.name = body.name;
    activity.img = body.img;
    return this.activityRepository.save(activity);
  }

  revealActivity(activityName, userId) {
    return this.entityManager
      .createQueryBuilder()
      .relation(User, 'activities')
      .of(userId)
      .add(activityName);
  }

  getCategoryName(activityName: string) {
    return this.activityRepository
      .createQueryBuilder('activity')
      .select('activity.categoryName')
      .limit(1)
      .getRawMany();
  }

  delete(activityName) {
    this.activityRepository.delete(activityName);
  }
}
