import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Activity } from '../../entities/Activity';
import { Topic } from '../../entities/Topic';
import { CategoryMapper } from './category.mapper';
import { query } from 'express';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  getUserActivitiesQuery(deviceId) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.activities', 'activity')
      .innerJoin('activity.category', 'category')
      .select(
        'category.name as category_name, category.img as category_img, category.topicName as topicName',
      )
      .addSelect('COUNT(activity.name)', 'user_activity_count')
      .where(`user.deviceId='${deviceId}'`)
      .groupBy('category_name, topicName')
      .getSql();
  }

  getActivitiesQuery(): string {
    return this.activityRepository
      .createQueryBuilder('activity')
      .innerJoin('activity.category', 'category')
      .select(
        'category.name as category_name, category.topicName as topicName, COUNT(activity.name) as activity_count',
      )
      .groupBy('category_name, topicName')
      .getSql();
  }

  getTopicsQuery() {
    return this.topicRepository
      .createQueryBuilder()
      .select('name, img')
      .getSql();
  }

  getCategoriesWithProgress(deviceId) {
    return this.entityManager
      .createQueryBuilder()
      .select(
        'user_activities.topicName, user_activities.category_name, user_activities.category_img, user_activities.user_activity_count, all_activities.activity_count',
      )
      .from(
        '(' + this.getUserActivitiesQuery(deviceId) + ')',
        'user_activities',
      )
      .innerJoin(
        '(' + this.getActivitiesQuery() + ')',
        'all_activities',
        'user_activities.category_name = all_activities.category_name',
      )
      .getSql();
  }

  async getCategoriesWithProgressWithTopics(deviceId: string) {
    const queryResult = await this.entityManager
      .createQueryBuilder()
      .select(
        'topic.name, topic.img, category_name, category_img, activity_count, user_activity_count',
      )
      .from('(' + this.getCategoriesWithProgress(deviceId) + ')', 'categories')
      .innerJoin(
        '(' + this.getTopicsQuery() + ')',
        'topic',
        'categories.topicName = topic.name',
      )
      .getRawMany();
    console.log(queryResult);
    const result = this.categoryMapper.mapper(queryResult);
    return result;
  }

  async increaseClickCount(categoryName: string) {
    return await this.categoryRepository
      .createQueryBuilder()
      .update('Category')
      .set({
        click: () => 'click + 1',
      })
      .where('name=:categoryName', { categoryName })
      .execute();
  }

  async getMostPopularCategories() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.click', 'DESC')
      .limit(10)
      .getMany();
  }

  getCategory(categoryName: string) {
    return this.categoryRepository
      .createQueryBuilder('category')
      .where('category.name=:categoryName', { categoryName })
      .getOne();
  }

  createCategory(topicName, body) {
    const category = new Category();
    category.name = body.name;
    category.img = body.img;
    category.topic = topicName;
    return this.categoryRepository.save(category);
  }

  delete(categoryName: string) {
    return this.categoryRepository.delete(categoryName);
  }

  //TEMP

  // i can't use
  getUserActivities(deviceId) {
    return this.topicRepository
      .createQueryBuilder('topic')
      .select(
        'topic.name as topic_name, topic.img as topic_img, category.name as category_name, category.img as category_img, user.device_id as user_device_id, COUNT(activity.id) as count',
      )
      .innerJoin('topic.category', 'category')
      .innerJoin('category.activity', 'activity')
      .leftJoin('activity.users', 'user', 'user.device_id=:deviceId', {
        deviceId,
      })
      .groupBy(
        'topic_name, topic_img, category_name, category_img, user_device_id',
      )
      .getRawMany();
  }
}
