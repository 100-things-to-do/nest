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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../../../schemas/category.schema';
import { Activity } from '../../../schemas/activity.schema';
import { ActivityService } from '../services/activity.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import ActivityDto from '../../../dtos/ActivityDto';
import { multerOptions } from '../../../config/multer';

@ApiTags('activities')
@Controller('topics/:topicId/categories/:categoryId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions))
  async createActivity(
    @UploadedFiles() image,
    @Body() activityDto: ActivityDto,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.activityService.addActivityToCategory(
      topicId,
      categoryId,
      activityDto,
      image,
    );
  }

  @Get('/:activityId')
  async getCategory(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.activityService.getActivity(topicId, categoryId, activityId);
  }

  @Get()
  async getActivities(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.activityService.getActivities(topicId, categoryId);
  }

  @Put('/:activityId')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
    @Body() activity: Activity,
  ) {
    return this.activityService.update(
      topicId,
      categoryId,
      activityId,
      activity,
    );
  }

  @Delete('/:activityId')
  async delete(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    return this.activityService.delete(topicId, categoryId, activityId);
  }
}
