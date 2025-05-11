import {
  CoursesDTO,
  CoursesDTOGeojson,
  UpdateCoursesDTOGeojson,
} from '@baobbab/dtos';
import { EntityManager } from '@mikro-orm/core';
import { NotFoundException } from '@nestjs/common';
import { Booking } from 'src/entities/booking.entity';
import { Categories } from 'src/entities/categories.entity';
import { Courses } from 'src/entities/courses.entity';
import { Organisation } from 'src/entities/organisation.entity';
import { Schedule } from 'src/entities/schedule.entity';

// export async function dtoToEntity(
//   courses: UpdateCoursesDTOGeojson,
//   em: EntityManager,
// ): Promise<Courses> {
//   const course = new Courses();
//   course.id = courses.id;
//   course.title = courses.title;
//   course.description = courses.description;
//   course.image = courses.image;
//   course.duration = courses.duration;
//   course.price = courses.price;
//   course.address = courses.address;
//   course.city = courses.city;
//   course.reminder = courses.reminder;
//   course.position = {
//     lat: courses.position.coordinates[1],
//     lng: courses.position.coordinates[0],
//   };

//   // Charger les relations depuis la base de données
//   const organisation = await em.findOne(Organisation, { id: courses.organisationId });
//   if (!organisation) {
//     throw new NotFoundException('Organisation not found');
//   }
//   course.organisation = organisation;

//   const category = await em.findOne(Categories, { id: courses.category.id });
//   if (!category) {
//     throw new NotFoundException('Category not found');
//   }
//   course.category = category;

//   // Convertir les schedules et bookings
//   course.schedule.set(courses.schedule.map((s) => {
//     const schedule = new Schedule();
//     schedule.id = s.id;
//     schedule.day = s.day;
//     schedule.hours = s.hours;
//     return schedule;
//   }));

//   async const course.booking.set(courses.booking.map((b) => {
//     const booking = new Booking();
//     booking.schedule = new Schedule();
//     booking.id = b.scheduleId;
//     booking.schedule.day = b.schedule.day;
//     booking.schedule.hours = b.schedule.hours;
//     const courseEntity = await em.findOne(Courses, { id: b.courseId });
//     if (!courseEntity) {
//       throw new NotFoundException('Course not found');
//     }
//     booking.courses = courseEntity;
//     return booking;
//   }));

//   return course;
// }

export function courseToDto(courses: Courses[]): CoursesDTOGeojson[] {
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    image: course.image,
    duration: course.duration,
    price: course.price,
    address: course.address,
    city: course.city || null,
    reminder: course.reminder || null,
    schedule: course.schedule.map((s) => ({
      id: s.id,
      day: s.day,
      hours: s.hours,
    })),
    position: {
      type: 'Point',
      coordinates: [course.position.lng, course.position.lat],
    },
    category: {
      id: course.category.id,
      title: course.category.title,
    },
    organisationId: course.organisation.id,
    booking: (course.booking?.isInitialized()
      ? course.booking.getItems()
      : []
    ).map((b) => ({
      courseId: b.courses.id,
      scheduleId: b.schedule.id,
      schedule: {
        day: b.schedule.day,
        hours: b.schedule.hours,
      },
      title: b.title,
    })),
  }));
}

export function singleCourseToDto(course: Courses): CoursesDTOGeojson {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    image: course.image,
    duration: course.duration,
    price: course.price,
    address: course.address,
    city: course.city || null,
    reminder: course.reminder || null,
    schedule: course.schedule.map((s) => ({
      id: s.id,
      day: s.day,
      hours: s.hours,
    })),
    position: {
      type: 'Point',
      coordinates: [course.position?.lng, course.position?.lat],
    },
    category: {
      id: course.category.id,
      title: course.category.title,
    },
    organisationId: course.organisation.id,
    booking: course.booking?.length
      ? course.booking.map((b) => ({
          courseId: b.courses?.id,
          scheduleId: b.schedule?.id,
          schedule: {
            day: b.schedule?.day,
            hours: b.schedule?.hours,
          },
          title: b.title,
        }))
      : [],
  };
}
