import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/ReturnCategory.dto';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: string): Promise<ReturnCategoryDto> {
    return new ReturnCategoryDto(
      await this.categoryService.findCategoryById(id),
    );
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createCategory(
    @Body() createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.createCategory(createCategory);
  }
}
