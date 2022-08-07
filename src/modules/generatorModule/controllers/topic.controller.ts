import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TopicService } from 'src/modules/generatorModule/services/topic.service';
import { Topic } from '../../../schemas/topic.schema';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import TopicDto from '../../../dtos/TopicDto';

@ApiTags('topics')
@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async createTopic(@Res() response, @Body() topicDto: TopicDto) {
    const newTopic = await this.topicService.create(topicDto);
    return response.status(HttpStatus.CREATED).json({
      newTopic,
    });
  }

  @Get('/:id')
  async getTopic(@Res() response, @Param('id') id: string) {
    const topic = await this.topicService.getTopic(id);
    return response.status(HttpStatus.OK).json({
      topic,
    });
  }

  @Get()
  async findAll(@Res() response) {
    const topics = await this.topicService.findAll();
    return response.status(HttpStatus.OK).json({
      topics,
    });
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string, @Body() topic: Topic) {
    const updatedTopic = await this.topicService.update(id, topic);
    return response.status(HttpStatus.OK).json({
      updatedTopic,
    });
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    const deletedTopic = await this.topicService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedTopic,
    });
  }
}
