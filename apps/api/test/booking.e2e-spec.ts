import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookingModule } from '../src/modules/booking/booking.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Booking } from '../src/entities/booking.entity';
import { Schedule } from '../src/entities/schedule.entity';
import { User } from '../src/entities/user.entity';
import { Courses } from '../src/entities/courses.entity';
import { Organisation } from '../src/entities/organisation.entity';
import { Categories } from '../src/entities/categories.entity';
import mikroOrmConfig from 'src/mikro-orm.config';
import { EntityManager } from '@mikro-orm/core';
import { Status, UserRole } from '@baobbab/dtos';
import { randomUUID } from 'crypto';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let em: EntityManager;
  let bookingId: string;
  let userId: string;
  let courseId: string;
  let scheduleId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(mikroOrmConfig),
        MikroOrmModule.forFeature([Booking, Schedule, User, Courses]),
        BookingModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    em = moduleFixture.get(EntityManager).fork();
    // Seed minimal entities
    const user = await em.findOne(User, {
      username: 'fanfan',
      email: 'fan@test.com',
      id: '333544c3-3b93-4f32-a04b-8f8fe9bf8b04',
    });
    if (!user) {
      throw new Error(
        'Test user not found. Please ensure the user exists in the database.',
      );
    }
    const organisation = em.create(Organisation, {
      organisationName: `Test Org ${randomUUID()}`,
      siret: `${Math.floor(Math.random() * 1e14)}`,
      email: 'org@test.com',
      password: '123',
      status: Status.APPROVED,
      role: UserRole.ADMIN,
      createdAt: new Date(),
    });
    const category = em.create(Categories, { title: 'Wellness' });
    const course = em.create(Courses, {
      title: 'Yoga',
      description: 'Yoga class',
      image: 'yoga.jpg',
      duration: 60,
      price: 10,
      address: 'somewhere',
      city: 'test',
      position: { lat: 0, lng: 0 },
      organisation: organisation,
      category: category,
      reminder: '1h before',
      booking: [],
    });

    const schedule = em.create(Schedule, {
      day: 'Monday',
      hours: '10:00-11:00',
      courses: course,
    });
    const booking = em.create(Booking, {
      title: 'Test Booking',
      user,
      courses: course,
      schedule,
    });

    await em.persistAndFlush([user, course, schedule, booking]);

    userId = user.id;
    courseId = course.id;
    scheduleId = schedule.id;
    bookingId = booking.id;
  });

  afterAll(async () => {
    await em.getConnection().close();
    await app.close();
  });

  it('GET /booking/:userId should return bookings', async () => {
    const response = await request(app.getHttpServer())
      .get(`/booking/${userId}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /booking/ should create a booking', async () => {
    const response = await request(app.getHttpServer())
      .post(`/booking/`)
      .send({
        userId: userId,
        createBooking: {
          title: 'New Booking',
          courseId: courseId,
          scheduleId: scheduleId,
        },
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Booking');
  });

  it('DELETE /booking/:bookingId/:userId should delete booking', async () => {
    await request(app.getHttpServer())
      .delete(`/booking/${bookingId}`)
      .send({ userId })
      .expect(200);
  });
});
