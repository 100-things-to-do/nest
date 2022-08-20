import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TopicController } from './controllers/topic.controller';
import { TopicService } from './services/topic.service';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './services/activity.service';
import { AchievementService } from './services/achievement.service';

import { AchievementController } from './controllers/achievement.controller';
import { Helper } from './helpers/helper';
import {
  Achievement,
  AchievementSchema,
} from '../achievements/schemas/achievement.schema';
import { AchievementsModule } from '../achievements/achievements.module';
import { Topic, TopicSchema } from './schemas/topic.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
    MongooseModule.forFeature([
      { name: Achievement.name, schema: AchievementSchema },
    ]),
    AchievementsModule,
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
  exports: [ActivityService, AchievementService],
})
export class GeneratorModule {}
