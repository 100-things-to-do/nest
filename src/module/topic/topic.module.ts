import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicRepository } from './topic.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Topic } from '../../entities/Topic';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [TopicService, TopicRepository],
})
export class TopicModule {}
