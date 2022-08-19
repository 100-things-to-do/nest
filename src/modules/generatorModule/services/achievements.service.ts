import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  Achievement,
  AchievementDocument,
} from '../../../schemas/achievement.schema';
import mongoose from 'mongoose';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
  ) {}

  async getAchievements(): Promise<any> {
    const achievementDocs = await this.achievementModel.find({});
    return achievementDocs;
  }

  //TODO: put dto
  async addAchievement(achievement: Achievement) {
    const newAchievement = new this.achievementModel(achievement);
    const result = await newAchievement.save();
    console.log('resulttt', result._id);
    return result._id;
  }
}
