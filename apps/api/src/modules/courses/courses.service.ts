import { CoursesDTO } from '@baobbab/dtos';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Courses } from 'src/entities/courses.entity';
import { Organisation } from 'src/entities/organisation.entity';
// import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CoursesService {
  constructor(private readonly em: EntityManager) {}
  private readonly logger = new Logger(CoursesService.name);

  async create(createCourse: CoursesDTO): Promise<Courses> {
    const course = new Courses();
    const organisation = await this.em.findOne(Organisation, {
      id: createCourse.organisationId,
    });

    if (!organisation) {
      this.logger.error('Organisation not found');
      throw new NotFoundException('Organisation not found');
    }

    // Exclure organisationId du DTO
    const { organisationId, ...courseData } = createCourse;

    // Assigner les données restantes
    wrap(course).assign(courseData, { em: this.em });

    course.organisation = organisation;
    await this.em.persistAndFlush(course);

    return this.em.findOneOrFail(
      Courses,
      { id: course.id },
      { populate: ['organisation', 'schedule'] },
    );
  }

  async findAll(): Promise<Courses[]> {
    return this.em.find(Courses, {}, { populate: ['schedule'] });
  }

  async findCoursesByCategory(categoryId?: string): Promise<Courses[]> {
    this.logger.debug('category dans Api back', categoryId);
    if (!categoryId) {
      return this.findAll();
    }
    const coursesCategory = await this.em.find(
      Courses,
      {
        category: { id: categoryId },
      },
      { populate: ['schedule'] },
    );

    // Vérification pour éviter les erreurs si schedule n'est pas chargé
    coursesCategory.forEach((course) => {
      if (!course.schedule.isInitialized()) {
        this.logger.warn(`Schedules not initialized for course ${course.id}`);
      }
    });
    return coursesCategory;
  }

  async findById(id: string): Promise<Courses> {
    const course = await this.em.findOne(
      Courses,
      { id },
      { populate: ['schedule'] },
    );
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  // async update(id: string, updateData: Partial<CoursesDTO>): Promise<Courses> {
  //   const course = await this.findById(id);
  //   if (!course) {
  //     throw new NotFoundException('Course not found');
  //   }
  //   this.em.assign(course, updateData);
  //   await this.em.persistAndFlush(course);
  //   return course;
  // }

  // async delete(id: string): Promise<void> {
  //   const course = await this.findById(id);
  //   if (!course) {
  //     throw new NotFoundException('Course not found');
  //   }
  //   await this.em.removeAndFlush(course);
  // }
}
