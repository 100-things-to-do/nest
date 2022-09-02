import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { Topic } from '../../entities/Topic';

@Injectable()
export class TopicRepository {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  getTopics() {
    return this.topicRepository.createQueryBuilder('topic').getMany();
  }

  async getCategoriesOfTopic(topicName: string) {
    const topicWithCategory = await this.topicRepository
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.category', 'category')
      .where('topic.name=:topicName', { topicName })
      .getOne();
    return topicWithCategory.category;
  }

  getTopicByName(topicName) {
    return this.topicRepository
      .createQueryBuilder('topic')
      .where('topic.name=:topicName', { topicName })
      .getOne();
  }

  create(request) {
    const topic = new Topic();
    topic.name = request.name;
    return this.topicRepository.save(topic);
  }

  delete(topicName) {
    return this.topicRepository.delete(topicName);
  }
}
