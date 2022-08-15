import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
import { Helper } from './helpers/helper';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
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
    Helper,
  ],
  exports: [ActivityService],
})
export class GeneratorModule {}
