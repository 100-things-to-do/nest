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
import { CategoryService } from '../services/category.service';
import { Category } from '../../../schemas/category.schema';
import { ApiTags } from '@nestjs/swagger';
import CategoryDto from '../../../dtos/CategoryDto';

@ApiTags('categories')
@Controller('topics/:topicId/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(@Param('topicId') topicId: string) {
    return this.categoryService.findAll(topicId);
  }

  @Post()
  async createCategory(
    @Body() categoryDto: CategoryDto,
    @Param('topicId') topicId: string,
  ) {
    return this.categoryService.addCategoryToTopic(topicId, categoryDto);
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
