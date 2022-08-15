import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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

  async getRevealedActivitiesOfCategory(
    userDeviceId: string,
    topicId: string,
    categoryId: string,
  ) {
    const userDocument: User = await this.userModel
      .findOne({ userDeviceId: userDeviceId })
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

  async getRevealedActivities(id: string) {}

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
