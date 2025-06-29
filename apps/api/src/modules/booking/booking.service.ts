import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { CreateABooking, UserBooking } from '@baobbab/dtos';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CoursesService } from '../courses/courses.service';
import { Booking } from 'src/entities/booking.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { User } from 'src/entities/user.entity';
import { Courses } from 'src/entities/courses.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Schedule)
    private scheduleRepository: EntityRepository<Schedule>,
    private coursesService: CoursesService,
    private userService: UserService,
  ) {}

  async create(
    userId: string,
    createBooking: CreateABooking,
  ): Promise<Booking> {
    // On récupère le User
    const user = await this.em.findOne(User, { id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // On récupére le cours
    const course = await this.coursesService.findById(createBooking.courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    // On recupere le schedule
    const schedule = await this.scheduleRepository.findOne({
      id: createBooking.scheduleId,
    });
    if (!schedule) throw new Error('Schedule not found');
    // On crée une réservation
    const booking = this.em.create(Booking, {
      title: createBooking.title,
      courses: course,
      schedule,
      user,
    });
    // On persiste la réservation
    await this.em.persistAndFlush(booking);
    return booking;
  }

  async findUserBookings(userId: string): Promise<UserBooking[]> {
    const booking = this.em.find(
      Booking,
      { user: { id: userId } },
      { populate: ['courses', 'schedule'] },
    );
    return booking;
  }

  async findOrganisationBookings(organisationId: string): Promise<Booking[]> {
    if (!organisationId) {
      throw new BadRequestException('organisationId is missing');
    }
    const course = await this.em.find(Courses, {
      organisation: { id: organisationId },
    });
    if (course.length === 0) {
      return [];
    }
    const bookings = await this.em.find(Booking, {
      courses: course.map((courses) => courses.id),
    });
    return bookings;
  }

  // async findOne(bookingId: string): Promise<Booking> {
  //   if (!bookingId) {
  //     throw new BadRequestException(' bookingId is missing');
  //   }

  //   const booking = await this.em.findOne(
  //     Booking,
  //     {
  //       id: bookingId,
  //     },
  //     {
  //       populate: ['courses', 'schedule'],
  //     },
  //   );
  //   if (!booking) throw new NotFoundException('the booking does not exist');
  //   return booking;
  // }

  // async update(
  //   bookingId: string,
  //   updateUserBooking: CreateABooking & { userId: string },
  // ) {
  //   if (!bookingId) {
  //     throw new BadRequestException(' bookingId is missing');
  //   }

  //   const booking = await this.em.findOne(
  //     Booking,
  //     { id: bookingId, user: { id: updateUserBooking.userId } },
  //     { populate: ['schedule'] },
  //   );
  //   if (!booking) {
  //     throw new NotFoundException('The booking does not exist');
  //   }

  //   const course = await this.coursesService.findById(
  //     updateUserBooking.courseId,
  //   );
  //   if (!course) throw new Error('Course not found');
  //   const user = await this.userService.findOneUserById(
  //     updateUserBooking.userId,
  //   );
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   //  const oldSchedule = await this.scheduleRepository.findOne({
  //   //   id: updateUserBooking.scheduleId,
  //   // });

  //   // if (!oldSchedule) throw new Error('Schedule not found');
  //   const newSchedule = new Schedule();
  //   newSchedule.day = updateUserBooking.schedule.day;
  //   newSchedule.hours = updateUserBooking.schedule.hours;
  //   newSchedule.courses = course;
  //   newSchedule.id = bookingId;

  //   await this.em.persistAndFlush(newSchedule);
  //   if (booking.schedule) {
  //     await this.em.removeAndFlush(booking.schedule);
  //   }
  //   wrap(booking).assign({
  //     courses: course,
  //     title: updateUserBooking.title,
  //     schedule: newSchedule,
  //     user: user,
  //   });

  //   Logger.debug('serviceUpdatebook', booking.schedule);
  //   await this.em.flush();
  //   return booking;
  // }

  // async update(
  //   bookingId: string,
  //   updateUserBooking: CreateABooking & { userId: string },
  // ) {
  //   if (!bookingId) throw new BadRequestException('bookingId is missing');

  //   const existingBooking = await this.em.findOne(
  //     Booking,
  //     { id: bookingId, user: { id: updateUserBooking.userId } },
  //     { populate: ['schedule'] },
  //   );

  //   if (!existingBooking) {
  //     throw new NotFoundException('Booking not found');
  //   }

  //   // Supprimer l'ancienne réservation (Booking + Schedule associé)
  //   await this.em.remove(existingBooking.schedule); // Schedule lié
  //   await this.em.remove(existingBooking); // Booking
  //   await this.em.flush();

  //   // Créer une nouvelle réservation
  //   const course = await this.coursesService.findById(
  //     updateUserBooking.courseId,
  //   );
  //   if (!course) throw new Error('Course not found');

  //   const user = await this.userService.findOneUserById(
  //     updateUserBooking.userId,
  //   );
  //   if (!user) throw new NotFoundException('User not found');

  //   const newSchedule = new Schedule();
  //   newSchedule.day = updateUserBooking.schedule.day;
  //   newSchedule.hours = updateUserBooking.schedule.hours;
  //   newSchedule.courses = course;

  //   const newBooking = new Booking();
  //   newBooking.title = updateUserBooking.title;
  //   newBooking.user = user;
  //   newBooking.courses = course;
  //   newBooking.schedule = newSchedule;

  //   await this.em.persistAndFlush(newBooking);

  //   return newBooking;
  // }
  async update(
    bookingId: string,
    updateUserBooking: CreateABooking,
    userId: string,
  ) {
    if (!bookingId) throw new BadRequestException('bookingId is missing');

    const existingBooking = await this.em.findOne(
      Booking,
      { id: bookingId, user: { id: userId } },
      { populate: ['schedule'] },
    );

    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }

    // Mettre à jour les champs
    existingBooking.title = updateUserBooking.title;

    if (existingBooking.schedule) {
      existingBooking.schedule.day = updateUserBooking.schedule.day;
      existingBooking.schedule.hours = updateUserBooking.schedule.hours;
    } else {
      // Si pas de Schedule (très rare), on crée
      const newSchedule = new Schedule();
      newSchedule.day = updateUserBooking.schedule.day;
      newSchedule.hours = updateUserBooking.schedule.hours;
      newSchedule.courses = existingBooking.courses;
      existingBooking.schedule = newSchedule;
    }

    await this.em.flush();

    return existingBooking;
  }

  async remove(bookingId: string, userId: string) {
    if (!bookingId) {
      throw new BadRequestException(' bookingId is missing');
    }
    if (!userId) {
      throw new Error('User ID is required');
    }

    const booking = await this.em.findOne(
      Booking,
      { id: bookingId, user: { id: userId } },
      { populate: ['schedule'] },
    );
    if (!booking) {
      throw new NotFoundException('The booking does not exist');
    }
    return this.em.removeAndFlush(booking);
  }
}
