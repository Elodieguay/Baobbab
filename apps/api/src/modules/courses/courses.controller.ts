import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesDTO } from '@baobbab/dtos';
import { entityToDto } from './courses.entityToDto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Créer un cours
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCourseDto: CoursesDTO,
  ): Promise<CoursesDTO | null> {
    const course = await this.coursesService.create(createCourseDto);
    return entityToDto(course);
  }

  // Récupérer tous les cours
  @Get()
  async findAll(): Promise<CoursesDTO> {
    return this.coursesService.findAll();
  }

  // // Récupérer un cours par ID
  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.coursesService.findById(id);
  // }

  //  // Mettre à jour un cours
  //  @Patch(':id')
  //  async update(
  //    @Param('id') id: string,
  //    @Body() updateCourseDto: Partial<CoursesDTO>,
  //  ) {
  //    return this.coursesService.update(id, updateCourseDto);
  //  }

  //  // Supprimer un cours
  //  @Delete(':id')
  //  @HttpCode(HttpStatus.NO_CONTENT)
  //  async delete(@Param('id') id: string) {
  //    await this.coursesService.delete(id);
  //  }
}
