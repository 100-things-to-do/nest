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
    @Res() response,
    @UploadedFiles() image,
    @Body() activityDto: ActivityDto,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const newActivity = await this.activityService.addActivityToCategory(
      topicId,
      categoryId,
      activityDto,
      image,
    );
    return response.status(HttpStatus.CREATED).json({
      newActivity,
    });
  }

  @Get('/:activityId')
  async getCategory(
    @Res() response,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    const category = await this.activityService.getActivity(
      topicId,
      categoryId,
      activityId,
    );
    return response.status(HttpStatus.OK).json({
      category,
    });
  }

  @Get()
  async findAll(
    @Res() response,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const activities = await this.activityService.findAll(topicId, categoryId);
    return response.status(HttpStatus.OK).json({
      activities,
    });
  }

  @Put('/:activityId')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Res() response,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
    @Body() activity: Activity,
  ) {
    const updatedActivity = await this.activityService.update(
      topicId,
      categoryId,
      activityId,
      activity,
    );
    return response.status(HttpStatus.OK).json({
      updatedActivity,
    });
  }

  @Delete('/:activityId')
  async delete(
    @Res() response,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
    @Param('activityId') activityId: string,
  ) {
    const deletedActivity = await this.activityService.delete(
      topicId,
      categoryId,
      activityId,
    );
    return response.status(HttpStatus.OK).json({
      deletedActivity,
    });
  }
}
