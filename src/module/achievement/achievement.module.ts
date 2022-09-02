import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from '../../entities/Achievement';
import { AchievementRepository } from './achievement.repository';
import { Activity } from '../../entities/Activity';
import { User } from '../../entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementController],
  providers: [AchievementService, AchievementRepository],
})
export class AchievementModule {}
