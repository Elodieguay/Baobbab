import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Schedule } from 'src/entities/schedule.entity';
import { CoursesService } from '../courses/courses.service';
import { Booking } from 'src/entities/booking.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Booking, Schedule])],
  controllers: [BookingController],
  providers: [BookingService, CoursesService],
})
export class BookingModule {}
