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
  async createTopic(@Body() topicDto: TopicDto) {
    return this.topicService.create(topicDto);
  }

  @Get('/:id')
  async getTopic(@Param('id') id: string) {
    return this.topicService.getTopic(id);
  }

  @Get()
  async findAll() {
    return this.topicService.findAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() topic: Topic) {
    return this.topicService.update(id, topic);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.topicService.delete(id);
  }
}
