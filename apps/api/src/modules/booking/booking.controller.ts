import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  BadRequestException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateABooking, UserBooking, UserRole } from '@baobbab/dtos';
import { entityToDto } from './booking.entityToDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async create(
    @Req() req: { user: { id: string } },
    @Body() createBooking: CreateABooking,
  ): Promise<CreateABooking> {
    const userId = req.user.id;
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

  @Patch(':bookingId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async update(
    @Req() req: { user: { id: string } },
    @Param('bookingId') bookingId: string,
    @Body()
    updateUserBooking: CreateABooking,
  ) {
    try {
      const userId = req.user.id;

      const result = await this.bookingService.update(
        bookingId,
        updateUserBooking,
        userId,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async delete(
    @Req() req: { user: { id: string } },
    @Param('bookingId') bookingId: string,
  ) {
    try {
      const userId = req.user.id;
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
