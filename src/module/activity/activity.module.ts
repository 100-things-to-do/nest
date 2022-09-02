import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '../../entities/Activity';
import { ActivityRepository } from './activity.repository';
import { Achievement } from '../../entities/Achievement';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    TypeOrmModule.forFeature([Achievement]),
    CategoryModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
