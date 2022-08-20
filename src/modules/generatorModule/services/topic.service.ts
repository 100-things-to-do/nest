import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TopicDto from '../models/dtos/TopicDto';
import { Topic, TopicDocument } from '../schemas/topic.schema';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {}

  async create(topicDto: TopicDto): Promise<Topic> {
    const newTopic: Topic = {
      name: topicDto.name,
    };
    const newTopicModel = new this.topicModel(newTopic);
    return newTopicModel.save();
  }

  async findAll(): Promise<Topic[]> {
    return this.topicModel.find().exec();
  }

  async update(id, newTopic: Topic): Promise<Topic> {
    await this.topicModel.updateOne({ _id: id }, newTopic);
    return this.topicModel.findOne({ _id: id });
  }

  async delete(id): Promise<any> {
    return this.topicModel.findByIdAndRemove(id);
  }

  async getTopic(id): Promise<Topic> {
    return this.topicModel.findOne({ _id: id }).exec();
  }
}
