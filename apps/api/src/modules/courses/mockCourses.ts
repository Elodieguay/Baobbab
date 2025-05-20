/* eslint-disable @typescript-eslint/no-explicit-any */
/* @ts-nocheck */

import { Status, UserRole } from '@baobbab/dtos';
import { Collection } from '@mikro-orm/core';
import { Booking } from 'src/entities/booking.entity';
import { Categories } from 'src/entities/categories.entity';
import { Courses } from 'src/entities/courses.entity';
import { Organisation } from 'src/entities/organisation.entity';
import { Schedule } from 'src/entities/schedule.entity';

export const coursesMock = (): Courses => {
  const mockCourse = new Courses();

  mockCourse.id = 'course1';
  mockCourse.title = 'Yoga';
  mockCourse.description = 'Cours de yoga doux';
  mockCourse.image = 'yoga.jpg';
  mockCourse.duration = 60;
  mockCourse.price = 25;
  mockCourse.address = '123 rue de la paix';
  mockCourse.city = 'Nantes';
  mockCourse.reminder = '1h avant';
  mockCourse.position = { lat: 47.218371, lng: -1.553621 };

  // Relations
  mockCourse.category = {
    id: 'cat1',
    title: 'Bien-être',
  } as Categories;

  const organisation = new Organisation();
  organisation.id = 'org1';
  organisation.organisationName = 'Zen School';
  organisation.role = UserRole.ADMIN; // or appropriate role
  organisation.status = Status.PENDING; // or appropriate status
  organisation.siret = '12345678901234'; // mock SIRET
  organisation.email = '123 rue de la paix'; // mock address
  organisation.siret = '12345678987654'; // mock city
  mockCourse.organisation = organisation;

  // Mock Schedule[]
  const schedule: Schedule = {
    id: 'sch1',
    day: 'Monday',
    hours: '10:00-11:00',
    courses: mockCourse,
    booking: null,
  } as Schedule;

  mockCourse.schedule = new Collection<Schedule>(mockCourse, [schedule]);

  // Mock Booking[]
  const booking: Booking = {
    id: 'book1',
    title: 'Réservation test',
    user: { id: 'user-123' } as any,
    courses: mockCourse,
    schedule: schedule,
  } as Booking;

  mockCourse.booking = new Collection<Booking>(mockCourse, [booking]);

  return mockCourse;
};
