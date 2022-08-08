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
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import CategoryDto from '../../../dtos/CategoryDto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../../../config/multer';

@ApiTags('categories')
@Controller('topics/:topicId/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Param('topicId') topicId: string) {
    return this.categoryService.findAll(topicId);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions))
  async createCategory(
    @UploadedFiles() image,
    @Body() categoryDto: CategoryDto,
    @Param('topicId') topicId: string,
  ) {
    return this.categoryService.addCategoryToTopic(image, topicId, categoryDto);
  }

  @Get('/:categoryId')
  async getCategory(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.getCategory(topicId, categoryId);
  }

  @Put('/:categoryId')
  async update(
    @Body() categoryDto: Category,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.update(topicId, categoryId, categoryDto);
  }

  @Delete('/:categoryId')
  async delete(
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.categoryService.delete(topicId, categoryId);
  }
}
