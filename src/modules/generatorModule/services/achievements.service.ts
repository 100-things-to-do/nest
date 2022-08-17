import { InjectModel } from '@nestjs/mongoose';
import {
  Achievements,
  AchievementsDocument,
} from '../../../schemas/achievements.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Achievement } from '../../../schemas/achievement.schema';

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
    console.log(achievementDoc);
    return achievementDoc;
  }

  //TODO: put dto
  async addAchievement(achievement: Achievement) {
    const query = {};
    const update = {
      $push: { achievements: achievement },
    };
    await this.achievementsModel.findOneAndUpdate(query, update);
  }

  async initAchievementsDocument() {
    const achievementsDoc = { achievements: [] } as Achievements;
    const newAchievementsDoc = new this.achievementsModel(achievementsDoc);
    return newAchievementsDoc.save();
  }
}
