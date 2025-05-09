import {
  BookingResponse,
  BookingWithSchedulesResponse,
  CreateABooking,
} from 'src/dtos/booking';
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

export function bookingUpdateToDto(booking: Booking) {
  return {
    id: booking.id,
    title: booking.title,
    schedule: booking.courses?.schedule?.map((s) => ({
      id: s.id,
      day: s.day,
      hours: s.hours,
    })),
    courses: {
      id: booking.courses.id,
      address: booking.courses.address,
      city: booking.courses.city ?? '',
      duration: booking.courses.duration.toString(),
      organisation: booking.courses.organisation?.id ?? '',
      reminder: booking.courses.reminder ?? '',
    },
  };
}

export function entityToBookingWithSchedulesDto(
  booking: Booking,
): BookingWithSchedulesResponse {
  return {
    id: booking.id,
    title: booking.title,
    schedule: {
      id: booking.schedule.id,
      day: booking.schedule.day,
      hours: booking.schedule.hours,
    },
    availableSchedules:
      booking.courses?.schedule?.map((s) => ({
        id: s.id,
        day: s.day,
        hours: s.hours,
      })) ?? [],
    courses: {
      id: booking.courses.id,
      address: booking.courses.address,
      city: booking.courses.city ?? '',
      duration: booking.courses.duration.toString(),
      organisation: booking.courses.organisation?.id ?? '',
      reminder: booking.courses.reminder ?? '',
    },
  };
}
