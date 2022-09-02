import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetAchievementsDto } from '../achievement/models/dto/GetAchievementsDto';
import { GetActivitiesDto } from './models/dto/GetActivitiesDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../config/multer';
import { CreateCategoryDto } from '../category/models/dto/CreateCategoryDto';
import { CreateActivityDto } from './models/dto/CreateActivityDto';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetActivitiesDto],
  })
  @ApiOperation({ summary: 'Data for if activity revealed or not' })
  @Get('/:categoryName/user/:userId')
  getActivitiesByCategoryName(
    @Param('categoryName') categoryName: string,
    @Param('userId') userId: string,
  ) {
    return this.activityService.getRevealedActivitiesByCategoryName(
      categoryName,
      userId,
    );
  }

  @ApiOperation({ summary: 'Get category activities' })
  @Get('/:categoryName')
  getActivitiesOfCategory(@Param('categoryName') categoryName: string) {
    return this.activityService.getActivitiesByCategoryName(categoryName);
  }

  @ApiOperation({
    summary: 'creates category',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('img', null, multerOptions))
  @Post('/:categoryName')
  createActivity(
    @Param('categoryName') categoryName: string,
    @Body() body: CreateActivityDto,
    @UploadedFiles() img,
  ) {
    return this.activityService.createActivity(categoryName, body, img);
  }

  @ApiOperation({ summary: 'Triggered when activity is revealed' })
  @Post('/:activityName/user/:userId/reveal')
  revealActivity(
    @Param('activityName') activityName: string,
    @Param('userId') userId: string,
  ) {
    return this.activityService.revealActivity(activityName, userId);
  }

  @Delete('/:activityName')
  delete(@Param('activityName') activityName: string) {
    this.activityService.delete(activityName);
  }
}
