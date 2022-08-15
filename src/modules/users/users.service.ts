import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './schemas/user.schema';
import { ActivityService } from '../generatorModule/services/activity.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly activityService: ActivityService,
  ) {}

  async createNewDeviceRecord(userDeviceId: string) {
    const result = await this.userModel
      .findOne({ userDeviceId: userDeviceId })
      .exec();

    if (result) {
      return;
    } else {
      const user: User = {
        userDeviceId: userDeviceId,
      };
      const newUser = new this.userModel(user);
      return newUser.save();
    }
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

  //TODO: delete it later, testing endpoint.
  async getUsers() {
    const result = await this.userModel.find().exec();
    return result;
  }

  //TODO: delete it later.
  async deleteUsers() {
    return this.userModel.deleteMany();
  }
}
