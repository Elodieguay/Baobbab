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
  Logger,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateABooking, UserBooking } from '@baobbab/dtos';
import { entityToDto } from './booking.entityToDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { logger } from '@mikro-orm/nestjs';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(
    @Body() createABooking: { userId: string; createBooking: CreateABooking },
  ): Promise<CreateABooking> {
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

  // @Get(':bookingId')
  // async findOne(
  //   @Param('bookingId') bookingId: string,
  // ): Promise<CreateABooking> {
  //   const booking = await this.bookingService.findOne(bookingId);
  //   return entityToDto(booking);
  // }

  @Patch(':bookingId')
  async update(
    @Param('bookingId') bookingId: string,
    @Body()
    updateUserBooking: CreateABooking & { userId: string },
  ) {
    try {
      const { userId, scheduleId, title, courseId, schedule } =
        updateUserBooking;

      const result = await this.bookingService.update(
        bookingId,
        updateUserBooking,
      );
      return {
        statusCode: 200,
        data: result,
      };
    } catch (error) {
      Logger.error('Error updating booking:', error);
    }
  }

  @Delete(':bookingId')
  async delete(
    @Param('bookingId') bookingId: string,
    @Body('userId') userId: string,
  ) {
    try {
      const result = await this.bookingService.remove(bookingId, userId);
      return {
        statusCode: 200,
        data: result,
      };
    } catch (error) {
      Logger.error('Error deleting booking:', error);
      if (error && typeof error === 'object' && 'message' in error) {
        throw new Error((error as { message: string }).message);
      }
      throw new Error('An unknown error occurred');
    }
  }
}
