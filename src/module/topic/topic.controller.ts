import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { TopicService } from './topic.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCategoryDto } from '../category/models/dto/GetCategoryDto';
import { GetTopicDto } from './models/dto/GetTopicDto';

@ApiTags('topics')
@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetTopicDto],
  })
  @ApiOperation({
    summary:
      'Get all topics with minimum info. Used in admin panel to select topic',
  })
  @Get()
  getTopics() {
    return this.topicService.getTopics();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetTopicDto],
  })
  @ApiOperation({ summary: 'get categories of topic' })
  @Get('/:topicName/categories')
  getCategoriesOfTopic(@Param('topicName') topicName: string) {
    return this.topicService.getCategoriesOfTopic(topicName);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetTopicDto,
  })
  @ApiOperation({ summary: 'get topic with minimum info' })
  @Get('/:topicName')
  getTopicByName(@Param('topicName') topicName: string) {
    return this.topicService.getTopicByName(topicName);
  }
}
