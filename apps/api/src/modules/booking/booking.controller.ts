import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateABooking } from '@baobbab/dtos';
import { entityToDto } from './booking.entityToDto';
import { Booking } from 'src/entities/booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBooking: CreateABooking): Promise<CreateABooking> {
    const booking = await this.bookingService.create(createBooking);
    return entityToDto(booking);
  }

  @Get()
  async findAll(bookings: Booking[]): Promise<CreateABooking[]> {
    const bookingsArray = await this.bookingService.findAll(bookings);
    return bookingsArray.map(entityToDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  //   return this.bookingService.update(+id, updateBookingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookingService.remove(+id);
  // }
}
