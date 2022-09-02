import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Activity } from '../../entities/Activity';
import { User } from '../../entities/User';
import { CategoryRepository } from './category.repository';
import { Topic } from '../../entities/Topic';
import { CategoryMapper } from './category.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Activity]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Topic]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryMapper],
  exports: [CategoryRepository],
})
export class CategoryModule {}
