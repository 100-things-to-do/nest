import { Module } from '@nestjs/common';
import { TopicController } from './controllers/topic.controller';
import { TopicService } from './services/topic.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Topic, TopicSchema } from '../../schemas/topic.schema';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './services/activity.service';
import { AchievementService } from './services/achievement.service';

import { AchievementController } from './controllers/achievement.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/100-things'),
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
  ],
  controllers: [
    TopicController,
    CategoryController,
    ActivityController,
    AchievementController,
  ],
  providers: [
    TopicService,
    CategoryService,
    ActivityService,
    AchievementService,
  ],
})
export class GeneratorModule {}