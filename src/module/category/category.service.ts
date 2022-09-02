import { Injectable } from '@nestjs/common';
import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { getImage } from '../../common/helper';
import { CreateCategoryDto } from './models/dto/CreateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getCategoriesWithProgressWithTopics(deviceId: string): any {
    return this.categoryRepository.getCategoriesWithProgressWithTopics(
      deviceId,
    );
  }

  getMostPopularCategories() {
    return this.categoryRepository.getMostPopularCategories();
  }

  getCategory(categoryName: string) {
    return this.categoryRepository.getCategory(categoryName);
  }

  createCategory(topicName: string, body: CreateCategoryDto, img) {
    body.img = getImage(img);
    return this.categoryRepository.createCategory(topicName, body);
  }

  delete(categoryName: string) {
    return this.categoryRepository.delete(categoryName);
  }
}
