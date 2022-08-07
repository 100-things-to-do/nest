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
  async findAll(@Res() response, @Param('topicId') topicId: string) {
    const categories = await this.categoryService.findAll(topicId);
    return response.status(HttpStatus.OK).json({
      categories,
    });
  }

  @Post()
  async createCategory(
    @Res() response,
    @Body() categoryDto: CategoryDto,
    @Param('topicId') topicId: string,
  ) {
    const newCategory = await this.categoryService.addCategoryToTopic(
      topicId,
      categoryDto,
    );
    return response.status(HttpStatus.CREATED).json({
      newCategory,
    });
  }

  @Get('/:categoryId')
  async getCategory(
    @Res() response,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const category = await this.categoryService.getGategory(
      topicId,
      categoryId,
    );
    return response.status(HttpStatus.OK).json({
      category,
    });
  }

  @Put('/:categoryId')
  async update(
    @Res() response,
    @Body() categoryDto: Category,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const updatedCategory = await this.categoryService.update(
      topicId,
      categoryId,
      categoryDto,
    );
    return response.status(HttpStatus.OK).json({
      updatedCategory,
    });
  }

  @Delete('/:categoryId')
  async delete(
    @Res() response,
    @Param('topicId') topicId: string,
    @Param('categoryId') categoryId: string,
  ) {
    const deletedCategory = await this.categoryService.delete(
      topicId,
      categoryId,
    );
    return response.status(HttpStatus.OK).json({
      deletedCategory,
    });
  }
}
