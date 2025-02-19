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
import { CoursesDTO, CoursesDTOGeojson } from '@baobbab/dtos';
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
  async findAll(): Promise<CoursesDTOGeojson[]> {
    const courses = await this.coursesService.findAll();
    return courses.map((course) => ({
      ...course,
      id: course.id,
      position: {
        type: 'Point',
        coordinates: [course.position.lng, course.position.lat],
      },
      organisationId: course.organisation.id,
    }));
  }

  // Récupérer un cours par ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<CoursesDTOGeojson> {
    const course = await this.coursesService.findById(id);
    return {
      ...course,
      id: course.id,
      position: {
        type: 'Point',
        coordinates: [course.position.lng, course.position.lat],
      },
      organisationId: course.organisation.id,
    };
  }

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
