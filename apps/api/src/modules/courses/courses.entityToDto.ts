import { CoursesDTO } from '@baobbab/dtos';
import { Courses } from 'src/entities/courses.entity';

export function entityToDto(courses: Courses): CoursesDTO {
  return {
    title: courses.title,
    description: courses.description,
    image: courses.image,
    days: courses.days,
    duration: courses.duration,
    hours: courses.hours,
    price: courses.price,
    address: courses.address,
    city: courses.city || undefined,
    reminder: courses.reminder || undefined,
    position: courses.position,
    category: courses.category,
    organisationId: courses.organisation.id,
  };
}
