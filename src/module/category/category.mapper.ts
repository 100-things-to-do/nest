import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryMapper {
  constructor() {}

  mapper(queryResultTopics) {
    const result = [];
    const group = {};
    for (const queryResultTopic of queryResultTopics) {
      if (!group[queryResultTopic.name]) {
        group[queryResultTopic.name] = {};
        group[queryResultTopic.name].categories = [];
        group[queryResultTopic.name].img = queryResultTopic.img;
      }
      const { name, img, ...trimmedObj } = queryResultTopic;
      group[queryResultTopic.name].categories.push(trimmedObj);
    }
    for (const categoryName of Object.keys(group)) {
      result.push({
        name: categoryName,
        img: group[categoryName].img,
        categories: group[categoryName].categories,
      });
    }
    return result;
  }
}
