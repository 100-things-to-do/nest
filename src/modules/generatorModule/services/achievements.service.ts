import { InjectModel } from '@nestjs/mongoose';
import {
  Achievements,
  AchievementsDocument,
} from '../../../schemas/achievements.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Achievement } from '../../../schemas/achievement.schema';
import mongoose from 'mongoose';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievements.name)
    private achievementsModel: Model<AchievementsDocument>,
  ) {}

  async getAchievements(): Promise<any> {
    let achievementDoc = await this.achievementsModel.findOne({});
    if (!achievementDoc) {
      await this.initAchievementsDocument();
      achievementDoc = await this.achievementsModel.findOne({});
    }
    return achievementDoc;
  }

  //TODO: put dto
  async addAchievement(achievement: Achievement) {
    const query = {};
    const update = {
      $push: { achievements: achievement },
    };
    const options = {
      new: true,
    };
    const result = await this.achievementsModel.findOneAndUpdate(
      query,
      update,
      options,
    );
    const achievementId =
      result.achievements[result.achievements.length - 1]._id;
    return achievementId;
  }

  async initAchievementsDocument() {
    const achievementsDoc = { achievements: [] } as Achievements;
    const newAchievementsDoc = new this.achievementsModel(achievementsDoc);
    return newAchievementsDoc.save();
  }
}
