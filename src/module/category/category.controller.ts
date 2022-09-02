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
import { CategoryService } from './category.service';
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPopularCategoriesDto } from './models/dto/GetPopularCategoriesDto';
import { GetDeviceCategoriesDto } from './models/dto/GetDeviceCategoriesDto';
import { GetCategoryDto } from './models/dto/GetCategoryDto';
import { CreateCategoryDto } from './models/dto/CreateCategoryDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../config/multer';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetPopularCategoriesDto],
  })
  @ApiOperation({
    summary: 'why its not working when its at lowest in controller?',
  })
  @Get('/popular')
  async getMostPopularCategories(): Promise<GetPopularCategoriesDto[]> {
    return this.categoryService.getMostPopularCategories();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetDeviceCategoriesDto],
  })
  @ApiOperation({
    summary:
      'gets categories grouped by topics. it has user progress data for Topics screen',
  })
  @Get('/device/:deviceId')
  async getCategories(@Param('deviceId') deviceId: string) {
    return this.categoryService.getCategoriesWithProgressWithTopics(deviceId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: GetCategoryDto,
  })
  @ApiOperation({
    summary: 'gets one category by name',
  })
  @Get('/:categoryName')
  async getCategory(@Param('categoryName') categoryName: string) {
    return this.categoryService.getCategory(categoryName);
  }

  @ApiOperation({
    summary: 'creates category',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('img', null, multerOptions))
  @Post('/:topicName')
  async createCategory(
    @Param('topicName') topicName: string,
    @Body() body: CreateCategoryDto,
    @UploadedFiles() img,
  ) {
    return this.categoryService.createCategory(topicName, body, img);
  }

  @Delete('/:categoryName')
  delete(@Param('categoryName') categoryName: string) {
    return this.categoryService.delete(categoryName);
  }
}
