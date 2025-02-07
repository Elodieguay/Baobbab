import { CoursesDTO } from '@baobbab/dtos';
import { EntityManager, wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Courses } from 'src/entities/courses.entity';
import { Organisation } from 'src/entities/organisation.entity';
// import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CoursesService {
  constructor(
    private readonly em: EntityManager,
    // private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createCourse: CoursesDTO): Promise<Courses> {
    // // il faut lier l'url de cloudinary avec la création de course.image pour le mettre dans la base de
    // const imageUrl =  await this.cloudinaryService.uploadImage(file)
    const course = new Courses();
    const organisation = await this.em.findOne(Organisation, {
      id: createCourse.organisationId,
    });

    if (!organisation) {
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
      { populate: ['organisation'] },
    );
  }

  async findAll(): Promise<Courses[]> {
    return this.em.find(Courses, {});
  }

  async findById(id: string): Promise<Courses | null> {
    return this.em.findOne(Courses, { id });
  }

  async update(id: string, updateData: Partial<CoursesDTO>): Promise<Courses> {
    const course = await this.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    this.em.assign(course, updateData);
    await this.em.persistAndFlush(course);
    return course;
  }

  async delete(id: string): Promise<void> {
    const course = await this.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    await this.em.removeAndFlush(course);
  }
}
