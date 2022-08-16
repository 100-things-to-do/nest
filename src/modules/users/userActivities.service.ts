import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityService } from '../generatorModule/services/activity.service';

@Injectable()
export class UserActivitiesService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly activityService: ActivityService,
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
    const result = this.revealActivityDb(
      userDeviceId,
      topicId,
      categoryId,
      activityId,
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
    console.log('revealedActivities', revealedActivities);
    for (const activity of activities) {
      const isActivityRevealed =
        revealedActivities.filter(
          (revealedActivity: string) =>
            revealedActivity == String(activity._id),
        ).length == 1;
      if (isActivityRevealed) {
        activity.isRevealed = true;
        console.log(activity);
      }
    }
    return activities;
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
  ) {
    const result = await this.userModel.updateOne(
      {
        userDeviceId: userDeviceId,
      },
      {
        $push: {
          'topics.$[i].categories.$[j].activities': activityId,
        },
      },
      {
        arrayFilters: [{ 'i._id': topicId }, { 'j._id': categoryId }],
        new: true,
      },
    );
    return result;
  }
}
