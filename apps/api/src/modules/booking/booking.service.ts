import { Injectable } from '@nestjs/common';
import { Booking } from 'src/entities/booking.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { CreateABooking } from '@baobbab/dtos';
import { populate } from 'dotenv';
import { Courses } from 'src/entities/courses.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Schedule } from 'src/entities/schedule.entity';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Schedule)
    private scheduleRepository: EntityRepository<Schedule>,
    private coursesService: CoursesService,
  ) {}

  async create(createBooking: CreateABooking): Promise<Booking> {
    // Récupérer le cours depuis la base de données en utilisant l'ID
    const course = await this.coursesService.findById(createBooking.courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    const schedule = await this.scheduleRepository.findOne({
      id: createBooking.scheduleId,
    });
    if (!schedule) throw new Error('Schedule not found');
    // Créer une réservation
    const booking = this.em.create(Booking, {
      title: createBooking.title,
      courses: course,
      schedule,
    });

    // Persister la réservation
    await this.em.persistAndFlush(booking);
    return booking;
  }

  async findAll(booking: Booking[]): Promise<Booking[]> {
    return this.em.findAll(Booking);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} booking`;
  // }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   return `This action updates a #${id} booking`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} booking`;
  // }
}
