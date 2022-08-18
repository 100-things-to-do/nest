import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityService } from '../generatorModule/services/activity.service';
import { AchievementService } from '../generatorModule/services/achievement.service';
import { UserActivitiesMapper } from './userActivities.mapper';

@Injectable()
export class UserActivitiesService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly activityService: ActivityService,
    private readonly achievementService: AchievementService,
    private readonly userActivitiesMapper: UserActivitiesMapper,
  ) {}

  async revealActivity(
    userDeviceId: string,
    topicId: string,
    categoryId: string,
    activityId: string,
  ) {
    const userDocument: User = await this.userModel
      .findOne({ userDeviceId: userDeviceId })
      .lean();

    const [isTopicCreated, isCategoryCreated] =
      this.getTopicAndCategoryCreateStatuses(userDocument, topicId, categoryId);
    if (isTopicCreated) {
      if (!isCategoryCreated) {
        await this.createCategoryWithId(userDeviceId, topicId, categoryId);
      }
    } else {
      await this.createTopicWithId(userDeviceId, topicId);
      await this.createCategoryWithId(userDeviceId, topicId, categoryId);
    }

    const activity = await this.activityService.getActivity(
      topicId,
      categoryId,
      activityId,
    );
    const achievementId = String(activity.achievement);
    const result = this.revealActivityDb(
      userDeviceId,
      topicId,
      categoryId,
      activityId,
      achievementId,
    );
  }

  async getActivities(deviceId: string, topicId: string, categoryId: string) {
    const activities = await this.activityService.getActivities(
      topicId,
      categoryId,
    );
    const revealedActivities = await this.getRevealedActivities(
      deviceId,
      topicId,
      categoryId,
    );
    let totalAchievements = 0;
    let achievedAchievements = 0;
    console.log('revealedActivities', revealedActivities);
    for (const activity of activities) {
      const isActivityRevealed =
        revealedActivities.filter(
          (revealedActivity: string) =>
            revealedActivity == String(activity._id),
        ).length == 1;
      if (isActivityRevealed) {
        activity.isRevealed = true;
        if (activity.achievement) {
          achievedAchievements += 1;
        }
      }
      if (activity.achievement) {
        totalAchievements += 1;
      }
    }
    return this.userActivitiesMapper.mapToUserActivities(
      activities,
      totalAchievements,
      achievedAchievements,
    );
  }

  async getRevealedActivities(
    deviceId: string,
    topicId: string,
    categoryId: string,
  ) {
    const userDocument: User = await this.userModel
      .findOne({ userDeviceId: deviceId })
      .lean();
    let revealedActivitiesOfCategory = [];
    for (const topic of userDocument.topics) {
      if (String(topic._id) === topicId) {
        for (const category of topic.categories) {
          if (String(category._id) === categoryId) {
            revealedActivitiesOfCategory = category.activities;
          }
        }
      }
    }
    return revealedActivitiesOfCategory;
  }

  getTopicAndCategoryCreateStatuses(
    userDocument: User,
    topicId: string,
    categoryId: string,
  ) {
    let isTopicCreated = false;
    let isCategoryCreated = false;
    for (const topic of userDocument.topics) {
      if (String(topic._id) === topicId) {
        isTopicCreated = true;
        for (const category of topic.categories) {
          if (String(category._id) === categoryId) {
            isCategoryCreated = true;
            break;
          }
        }
        break;
      }
    }
    return [isTopicCreated, isCategoryCreated];
  }

  async createCategoryWithId(
    userDeviceId: string,
    topicId: string,
    categoryId: string,
  ) {
    const result = await this.userModel.updateOne(
      {
        userDeviceId: userDeviceId,
      },
      {
        $push: {
          'topics.$[i].categories': {
            _id: categoryId,
          },
        },
      },
      {
        arrayFilters: [{ 'i._id': topicId }],
        new: true,
      },
    );
    return result;
  }

  async createTopicWithId(userDeviceId: string, topicId: string) {
    const result = await this.userModel.updateOne(
      {
        userDeviceId: userDeviceId,
      },
      {
        $push: {
          topics: {
            _id: topicId,
          },
        },
      },
      {
        new: true,
      },
    );
    return result;
  }

  async revealActivityDb(
    userDeviceId: string,
    topicId: string,
    categoryId: string,
    activityId: string,
    achievementId: string,
  ) {
    const pushObject = { 'topics.$[i].categories.$[j].activities': activityId };
    if (achievementId) {
      pushObject['topics.$[i].categories.$[j].achievements'] = achievementId;
    }
    console.log(pushObject);

    const result = await this.userModel.updateOne(
      {
        userDeviceId: userDeviceId,
      },
      {
        $push: pushObject,
      },
      {
        arrayFilters: [{ 'i._id': topicId }, { 'j._id': categoryId }],
        new: true,
      },
    );
    return result;
  }
}
