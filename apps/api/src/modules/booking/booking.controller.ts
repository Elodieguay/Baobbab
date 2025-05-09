import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
  BadRequestException,
  Put,
  Logger,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  bookingUpdateToDto,
  entityToBookingWithSchedulesDto,
  entityToDto,
} from './booking.entityToDto';
import { Booking } from 'src/entities/booking.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { logger } from '@mikro-orm/nestjs';
import {
  BookingResponse,
  BookingResponseCourses,
  BookingWithSchedulesResponse,
  CreateABooking,
  UserBooking,
} from 'src/dtos/booking';
import { CoursesDTOGeojson } from 'src/dtos/courses';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(
    @Body() createABooking: { userId: string; createBooking: CreateABooking },
  ): Promise<CreateABooking> {
    // Récupération de l'ID de l'utilisateur (à condition que l'authentification soit en place)
    const { userId, createBooking } = createABooking;
    const booking = await this.bookingService.create(userId, createBooking);
    return entityToDto(booking);
  }

  @Get(':userId')
  async findUserBookings(
    @Param('userId') userId: string,
  ): Promise<UserBooking[]> {
    return this.bookingService.findUserBookings(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('organisation/:organisationId')
  async findOrganisationBookings(
    @Param('organisationId') organisationId: string,
  ): Promise<UserBooking[]> {
    if (!organisationId) {
      throw new BadRequestException('Organisation ID is required');
    }
    const bookings =
      await this.bookingService.findOrganisationBookings(organisationId);
    return bookings;
  }

  @Get(':bookingId')
  async findOne(
    @Param('bookingId') bookingId: string,
  ): Promise<BookingResponseCourses> {
    const booking = await this.bookingService.findOne(bookingId);
    Logger.warn('booking', booking);
    return bookingUpdateToDto(booking);
  }

  @Patch(':bookingId')
  async update(
    @Param('bookingId') bookingId: string,
    @Body()
    updateUserBooking: { userId: string; updateBooking: CreateABooking },
  ) {
    try {
      const { userId, updateBooking } = updateUserBooking;

      const result = await this.bookingService.update(
        bookingId,
        userId,
        updateBooking,
      );

      return {
        statusCode: 200,
        message: 'Booking successfully updated',
        data: result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':bookingId')
  async delete(
    @Param('bookingId') bookingId: string,
    @Body('userId') userId: string,
  ) {
    logger.log('bookingId', bookingId);

    try {
      logger.log('bookingId', bookingId);

      const result = await this.bookingService.remove(bookingId, userId);
      return {
        statusCode: 200,
        message: 'Booking successfully deleted',
        data: result,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
