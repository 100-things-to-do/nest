import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Activity } from '../../../schemas/activity.schema';
import { Topic, TopicDocument } from '../../../schemas/topic.schema';
import { Category } from '../../../schemas/category.schema';
import {
  Achievement,
  AchievementDocument,
} from '../../../schemas/achievement.schema';
import {
  Achievements,
  AchievementsDocument,
} from '../../../schemas/achievements.schema';
import ObjectId = mongoose.Schema.Types.ObjectId;
import { AchievementsService } from './achievements.service';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
    private readonly achievementsService: AchievementsService,
  ) {}

  async addAchievementToActivity(
    topicId,
    categoryId,
    activityId,
    achievementDto: Achievement,
    images: any,
  ): Promise<Topic> {
    achievementDto.image = this.getImage(images);
    const achievementId = await this.achievementsService.addAchievement(
      achievementDto,
    );
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      {
        $set: {
          'categories.$[i].activities.$[j].achievement': achievementId,
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

  getImage(images: any): string {
    if (images && images.length > 0) {
      return images[0].filename;
    } else {
      return null;
    }
  }
}
