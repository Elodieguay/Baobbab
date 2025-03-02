import { CreateABooking } from '@baobbab/dtos';
import { Booking } from 'src/entities/booking.entity';

export function entityToDto(booking: Booking): CreateABooking {
  return {
    courseId: booking.courses?.id,
    scheduleId: booking.schedule.id,
    title: booking.title,
    schedule: {
      day: booking.schedule.day,
      hours: booking.schedule.hours,
    },
  };
}
