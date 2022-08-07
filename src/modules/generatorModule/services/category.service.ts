import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../../schemas/category.schema';
import { Topic, TopicDocument } from '../../../schemas/topic.schema';
import CategoryDto from '../../../dtos/CategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {}

  async findAll(topicId): Promise<Category[]> {
    const topic: Topic = await this.topicModel.findOne({ _id: topicId }).exec();
    if (topic) {
      const categories: Category[] = topic.categories;
      return categories;
    } else {
      return <Category[]>[];
    }
  }

  async addCategoryToTopic(topicId, categoryDto: CategoryDto): Promise<Topic> {
    console.log(categoryDto);
    return this.topicModel.findOneAndUpdate(
      { _id: topicId },
      { $push: { categories: categoryDto } },
      { new: true },
    );
  }

  async update(topicId, categoryId, newCategory: Category): Promise<Topic> {
    await this.topicModel.updateOne(
      { _id: topicId },
      { $set: { 'categories.$[i]': newCategory } },
      {
        arrayFilters: [
          {
            'i._id': categoryId,
          },
        ],
      },
    );
    return await this.topicModel.findOne({ _id: topicId });
  }

  async delete(topicId, categoryId): Promise<Topic> {
    await this.topicModel.updateOne<Topic>(
      { _id: topicId },
      { $pull: { categories: { _id: categoryId } } },
    );
    return await this.topicModel.findOne({ _id: topicId });
  }

  async getGategory(topicId, categoryId): Promise<Category> {
    const topic: Topic = await this.topicModel.findOne({ _id: topicId }).exec();
    if (topic) {
      let foundedCategory = null;
      for (const category of topic.categories) {
        if (category._id == categoryId) {
          foundedCategory = category;
          break;
        }
      }
      return foundedCategory;
    } else {
      return null;
    }
  }
}
