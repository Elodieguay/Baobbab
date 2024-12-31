import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from '@baobbab/dtos';
import { logger } from '@mikro-orm/nestjs';
import { Categories } from 'src/entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategory: CategoryDTO[]): Promise<CategoryDTO[]> {
    logger.debug('je suis dans le category controller');
    return this.categoriesService.create(createCategory);
  }

  @Get()
  findAll(categories: Categories[]): Promise<CategoryDTO[]> {
    return this.categoriesService.findAllCategories(categories);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
