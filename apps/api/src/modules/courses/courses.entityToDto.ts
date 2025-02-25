import { CoursesDTO, CoursesDTOGeojson } from '@baobbab/dtos';
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

export function courseToDto(courses: Courses[]): CoursesDTOGeojson[] {
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    image: course.image,
    days: course.days,
    duration: course.duration,
    hours: course.hours,
    price: course.price,
    address: course.address,
    city: course.city || null,
    reminder: course.reminder || null,
    position: {
      type: 'Point',
      coordinates: [course.position.lng, course.position.lat],
    },
    category: {
      id: course.category.id,
      title: course.category.title,
    },
    organisationId: course.organisation.id,
  }));
}
