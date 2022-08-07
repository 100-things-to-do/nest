import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from '../../../schemas/activity.schema';
import { Topic, TopicDocument } from '../../../schemas/topic.schema';
import { Category } from '../../../schemas/category.schema';
import { Achievement } from '../../../schemas/achievement.schema';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {}

  async addAchievementToActivity(
    topicId,
    categoryId,
    activityId,
    achievementDto: Achievement,
  ): Promise<Topic> {
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      {
        $set: {
          'categories.$[i].activities.$[j].achievement': achievementDto,
        },
      },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
          {
            'j._id': activityId,
          },
        ],
        new: true,
      },
    );
  }

  async getAchievement(topicId, categoryId, activityId): Promise<Achievement> {
    const topic: Topic = await this.topicModel.findOne({ _id: topicId }).exec();
    if (topic) {
      let foundedCategory: Category = null;
      for (const category of topic.categories) {
        if (category._id == categoryId) {
          foundedCategory = category;
          break;
        }
      }
      if (foundedCategory) {
        let foundedActivity: Activity = null;
        for (const activity of foundedCategory.activities) {
          if (activity._id == activityId) {
            foundedActivity = activity;
            break;
          }
        }
        if (foundedActivity) {
          console.log(foundedActivity);
          return foundedActivity.achievement;
        }
        return null;
      }
    } else {
      return null;
    }
  }

  async update(
    topicId,
    categoryId,
    activityId,
    newAchievement: Achievement,
  ): Promise<Topic> {
    await this.topicModel.updateOne(
      {
        _id: topicId,
      },
      {
        $set: { 'categories.$[i].activities.$[j].achievement': newAchievement },
      },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
          { 'j._id': activityId },
        ],
      },
    );

    return await this.topicModel.findOne({ _id: topicId });
  }

  async delete(topicId, categoryId, activityId): Promise<Topic> {
    await this.topicModel.updateOne<Topic>(
      { _id: topicId },
      { $unset: { 'categories.$[i].activities.$[j].achievement': '' } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
          {
            'j._id': activityId,
          },
        ],
      },
    );
    return await this.topicModel.findOne({ _id: topicId });
  }
}
