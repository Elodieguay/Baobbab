import { Injectable } from '@nestjs/common';
import { setPriority } from 'os';
import { Categories } from 'src/entities/categories.entity';
import { CategoryDTO } from '@baobbab/dtos';
import { EntityManager } from '@mikro-orm/core';
import { logger } from '@mikro-orm/nestjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly em: EntityManager) {}

  async create(createCategory: CategoryDTO[]): Promise<Categories[]> {
    console.log('je suis là');
    logger.debug('je suis là');

    const categoryArray = [
      { title: 'Sport' },
      { title: 'Danse' },
      { title: 'Arts & Cultures' },
      { title: 'Bien-être' },
      { title: 'Vie & Solidarité' },
      { title: 'Environnement' },
      { title: 'Evènements' },
    ];
    const categories = categoryArray.map((category) =>
      this.em.create(Categories, category),
    );
    await this.em.persistAndFlush(categories);
    return categories;
  }

  async findAllCategories(categories: CategoryDTO[]): Promise<Categories[]> {
    return this.em.findAll(Categories);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
