import { Injectable } from '@nestjs/common';
import { TopicRepository } from './topic.repository';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  getTopics() {
    return this.topicRepository.getTopics();
  }

  getCategoriesOfTopic(topicName: string) {
    return this.topicRepository.getCategoriesOfTopic(topicName);
  }

  getTopicByName(topicName) {
    return this.topicRepository.getTopicByName(topicName);
  }

  create(request) {
    return this.topicRepository.create(request);
  }

  delete(topicName) {
    return this.topicRepository.delete(topicName);
  }
}
