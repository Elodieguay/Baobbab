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
  Query,
  Req,
  HttpException,
  Logger,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  CoursesDTO,
  CoursesDTOGeojson,
  UpdateCoursesDTOGeojson,
} from '@baobbab/dtos';
import { courseToDto, singleCourseToDto } from './courses.entityToDto';
import { logger } from '@mikro-orm/nestjs';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Créer un cours
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCourseDto: CoursesDTO,
  ): Promise<CoursesDTOGeojson | null> {
    const course = await this.coursesService.create(createCourseDto);
    return singleCourseToDto(course);
  }

  // // Récupérer tous les cours
  // @Get()
  // async findAll(): Promise<CoursesDTOGeojson[]> {
  //   const courses = await this.coursesService.findAll();
  //   return courses.map((course) => ({
  //     ...course,
  //     id: course.id,
  //     position: {
  //       type: 'Point',
  //       coordinates: [course.position.lng, course.position.lat],
  //     },
  //     organisationId: course.organisation.id,
  //   }));
  // }

  @Get()
  async findByCategory(
    @Req() req: Request,
    @Query('categoryId') categoryId?: string,
  ): Promise<CoursesDTOGeojson[]> {
    if (categoryId) {
      const coursesCategory =
        await this.coursesService.findCoursesByCategory(categoryId);
      return courseToDto(coursesCategory);
    } else {
      const allCourses = await this.coursesService.findAll();
      return courseToDto(allCourses);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CoursesDTOGeojson> {
    const course = await this.coursesService.findById(id);
    return singleCourseToDto(course);
  }

  @Patch(':courseId')
  async update(
    @Param('courseId') courseId: string,
    @Body() updateCourse: UpdateCoursesDTOGeojson,
  ) {
    return this.coursesService.updateCourse(courseId, updateCourse);
  }

  @Delete(':courseId')
  async delete(@Param('courseId') courseId: string) {
    try {
      const course = await this.coursesService.deleteCourse(courseId);
      return {
        statusCode: 200,
        message: 'Booking successfully deleted',
        data: course,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
