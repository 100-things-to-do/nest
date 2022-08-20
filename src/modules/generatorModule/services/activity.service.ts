import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Helper } from '../helpers/helper';
import ActivityDto from '../models/dtos/ActivityDto';
import { Achievement } from '../../achievements/schemas/achievement.schema';
import { Activity } from '../schemas/activity.schema';
import { Topic, TopicDocument } from '../schemas/topic.schema';
import { Category } from '../schemas/category.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
    private readonly helper: Helper,
  ) {}

  async getActivities(topicId, categoryId): Promise<Activity[]> {
    const topic: Topic = await this.topicModel
      .findOne({ _id: topicId })
      .populate({
        path: 'categories',
        populate: {
          path: 'activities',
          populate: {
            path: 'achievement',
            model: 'Achievement',
          },
        },
      })
      .exec();
    if (!topic) {
      return <Activity[]>[];
    }
    let activities = <Activity[]>[];
    for (const category of topic.categories) {
      if (String(category._id) === categoryId) {
        activities = category.activities;
      }
    }
    return activities;
  }

  async addActivityToCategory(
    topicId,
    categoryId,
    activityDto: ActivityDto,
    images: any, //Express.Multer.File[]
  ): Promise<Topic> {
    activityDto.image = this.getImage(images);
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      { $push: { 'categories.$[i].activities': activityDto } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
        ],
        new: true,
      },
    );
  }

  async getActivity(topicId, categoryId, activityId): Promise<Activity> {
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
        return foundedActivity;
      }
    } else {
      return null;
    }
  }

  async update(
    topicId,
    categoryId,
    activityId,
    newActivity: Activity,
  ): Promise<Topic> {
    const setQueryObject = this.helper.getUpdatedFieldsQuery(
      newActivity,
      'categories.$[i].activities.$[j]',
    );
    console.log(setQueryObject);
    await this.topicModel.updateOne(
      {
        _id: topicId,
      },
      { $set: setQueryObject },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
          { 'j._id': activityId },
        ],
      },
    );

    return this.topicModel.findOne({ _id: topicId });
  }

  async delete(topicId, categoryId, activityId): Promise<Topic> {
    await this.topicModel.updateOne<Topic>(
      { _id: topicId },
      { $pull: { 'categories.$[i].activities': { _id: activityId } } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
        ],
      },
    );
    return this.topicModel.findOne({ _id: topicId });
  }

  //Express.Multer.File[]
  getImage(images: any): string {
    if (images && images.length > 0) {
      return images[0].filename;
    } else {
      return null;
    }
  }
}
