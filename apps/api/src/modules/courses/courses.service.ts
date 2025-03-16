import {
  CoursesDTO,
  CoursesDTOGeojson,
  UpdateCoursesDTOGeojson,
} from '@baobbab/dtos';
import { EntityManager, wrap } from '@mikro-orm/core';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
      { populate: ['schedule', 'booking'] },
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
      { populate: ['schedule', 'booking'] },
    );
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  // async update(
  //   courseId: string,
  //   updateCourse: UpdateCoursesDTOGeojson,
  // ): Promise<Courses> {
  //   if (!courseId) {
  //     throw new NotFoundException('Course not found');
  //   }

  //   const course = await this.findById(courseId);
  //   if (!course) {
  //     throw new NotFoundException('Course not found');
  //   }

  //   // Mise à jour des propriétés simples
  //   course.title = updateCourse.title;
  //   course.description = updateCourse.description;
  //   course.image = updateCourse.image;
  //   course.duration = updateCourse.duration;
  //   course.price = updateCourse.price;
  //   course.address = updateCourse.address;
  //   course.city = updateCourse.city;
  //   course.reminder = updateCourse.reminder;
  //   course.position = {
  //     coordinates: [
  //       updateCourse.position.coordinates[0],
  //       updateCourse.position.coordinates[1],
  //     ],
  //   } as any;

  //   // Mise à jour des relations (organisation et category)
  //   if (updateCourse.organisationId) {
  //     const organisation = await this.em.findOne(Organisation, {
  //       id: updateCourse.organisationId,
  //     });
  //     if (!organisation) {
  //       throw new NotFoundException('Organisation not found');
  //     }
  //     course.organisation = organisation;
  //   }

  //   if (updateCourse.category?.id) {
  //     const category = await this.em.findOne(Categories, {
  //       id: updateCourse.category.id,
  //     });
  //     if (!category) {
  //       throw new NotFoundException('Category not found');
  //     }
  //     course.category = category;
  //   }

  //   // Mise à jour des schedules
  //   course.schedule.removeAll(); // Vide les anciens schedules
  //   const newSchedules = updateCourse.schedule.map((s) => {
  //     const schedule = new Schedule();
  //     schedule.id = s.id;
  //     schedule.day = s.day;
  //     schedule.hours = s.hours;
  //     return schedule;
  //   });
  //   course.schedule.add(...(newSchedules as [Schedule]));

  //   // Mise à jour des bookings
  //   course.booking.removeAll();
  //   const newBookings = updateCourse.booking.map((b) => {
  //     const booking = new Booking();
  //     return booking;
  //   });
  //   course.booking.add(...(newBookings as [Booking]));

  //   await this.em.persistAndFlush(course);
  //   return course;
  // }

  // Méthode pour la mise à jour des champs de base
  private updateBasicFields(
    course: Courses,
    updateCourse: UpdateCoursesDTOGeojson,
  ) {
    Object.assign(course, {
      title: updateCourse.title,
      description: updateCourse.description,
      image: updateCourse.image,
      duration: updateCourse.duration,
      price: updateCourse.price,
      address: updateCourse.address,
      city: updateCourse.city,
      reminder: updateCourse.reminder,
      position: updateCourse.position
        ? { coordinates: updateCourse.position.coordinates }
        : course.position,
    });
  }
  async updateCourse(
    courseId: string,
    updateCourse: UpdateCoursesDTOGeojson,
  ): Promise<Courses> {
    if (!courseId) {
      throw new NotFoundException('Course not found');
    }

    const course = await this.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Mise à jour des propriétés de base du cours
    this.updateBasicFields(course, updateCourse);

    // Enregistrer les modifications
    await this.em.persistAndFlush(course);
    return course;
  }

  async deleteCourse(courseId: string): Promise<void> {
    if (!courseId) {
      throw new BadRequestException(' courseId is missing');
    }
    const course = await this.findById(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    await this.em.removeAndFlush(course);
  }
}
