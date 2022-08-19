import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AchievementService } from '../generatorModule/services/achievement.service';
import { AchievementsService } from '../generatorModule/services/achievements.service';

export class UserAchievementsService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly achievementsService: AchievementsService,
  ) {}
  async getAchievements() {
    const allAchievements = this.achievementsService.getAchievements();
  }

  // get all activities of user.
  // get activities' achievements. (n^2 search)
  async getUserAchievements() {}
}
