import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CoursesService } from '../courses/courses.service';
import { UserService } from '../user/user.service';
import { Booking } from 'entities/booking.entity';
import { Schedule } from 'entities/schedule.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Booking, Schedule])],
  controllers: [BookingController],
  providers: [BookingService, CoursesService, UserService],
})
export class BookingModule {}
