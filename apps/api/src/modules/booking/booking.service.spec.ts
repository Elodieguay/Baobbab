/* eslint-disable @typescript-eslint/no-explicit-any */
/* @ts-nocheck */

import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { EntityManager } from '@mikro-orm/core';
import { CoursesService } from '../courses/courses.service';
import { Booking } from 'src/entities/booking.entity';

describe('BookingService', () => {
  let service: BookingService;
  let emMock: any;
  let scheduleRepoMock: any;
  let coursesServiceMock: any;

  beforeEach(async () => {
    emMock = {
      persistAndFlush: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    };

    scheduleRepoMock = {
      findOne: jest.fn(),
    };

    coursesServiceMock = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: EntityManager,
          useValue: emMock,
        },
        {
          provide: 'ScheduleRepository',
          useValue: scheduleRepoMock,
        },
        {
          provide: CoursesService,
          useValue: coursesServiceMock,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking and persist it', async () => {
      const userId = 'user-123';
      const createBooking = {
        title: 'Yoga',
        courseId: 'course-1',
        scheduleId: 'schedule-1',
        schedule: { day: 'Monday', hours: '10:00-11:00' },
      };

      const courseMock = { id: 'course-1' };
      const scheduleMock = { id: 'schedule-1' };
      const userMock = { id: userId };
      const bookingEntityMock = { id: 'mock-booking-id' } as Booking;

      coursesServiceMock.findById.mockResolvedValue(courseMock);
      scheduleRepoMock.findOne.mockResolvedValue(scheduleMock);
      emMock.create.mockReturnValue(bookingEntityMock);
      emMock.findOne.mockResolvedValue(userMock);

      const result = await service.create(userId, createBooking);

      expect(coursesServiceMock.findById).toHaveBeenCalledWith('course-1');
      expect(scheduleRepoMock.findOne).toHaveBeenCalledWith({
        id: 'schedule-1',
      });
      expect(emMock.findOne).toHaveBeenCalledWith(expect.any(Function), {
        id: userId,
      });
      expect(emMock.persistAndFlush).toHaveBeenCalled();
      expect(result).toEqual(bookingEntityMock);
    });
  });

  describe('delete', () => {
    it('should delete a booking', async () => {
      const bookingId = 'booking-123';
      const userId = '123';
      const bookingMock = {
        id: bookingId,
        user: { id: userId },
      };

      emMock.findOne.mockResolvedValue(bookingMock);
      emMock.removeAndFlush = jest.fn();

      await service.remove(bookingId, userId);

      expect(emMock.findOne).toHaveBeenCalledWith(
        Booking,
        { id: bookingId, user: { id: userId } },
        { populate: ['schedule'] },
      );
      expect(emMock.removeAndFlush).toHaveBeenCalledWith(bookingMock);
    });
  });

  describe('findUserBookings', () => {
    it('should find user bookings', async () => {
      const userId = 'user-123';
      const bookingMock = [
        {
          id: 'booking-1',
          title: 'Yoga',
          schedule: { id: 'schedule-1', day: 'Monday', hours: '10:00-11:00' },
          courses: { id: 'course-1' },
        },
      ];

      emMock.find = jest.fn().mockResolvedValue(bookingMock);

      const result = await service.findUserBookings(userId);

      expect(emMock.find).toHaveBeenCalledWith(
        Booking,
        { user: { id: userId } },
        { populate: ['courses', 'schedule'] },
      );
      expect(result).toEqual(bookingMock);
    });
  });
});
