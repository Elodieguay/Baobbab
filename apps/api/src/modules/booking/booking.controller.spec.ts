/* eslint-disable @typescript-eslint/no-explicit-any */
/* @ts-nocheck */

import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { entityToDto } from './booking.entityToDto';
import { CreateABooking } from '@baobbab/dtos';

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: jest.Mocked<BookingService>;

  beforeEach(async () => {
    const mockBookingService: jest.Mocked<Partial<BookingService>> = {
      create: jest.fn(),
      remove: jest.fn(),
      findUserBookings: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingService,
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(
      BookingService,
    ) as jest.Mocked<BookingService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call bookingService.create and return DTO', async () => {
      // 1. Données d’entrée
      const userId = 'user-123';
      const createBooking: CreateABooking = {
        title: 'Cours de yoga',
        courseId: 'course-123',
        scheduleId: 'schedule-123',
        schedule: {
          day: 'Monday',
          hours: '10:00-11:00',
        },
      };

      // 2. Mock de la réservation renvoyée par le service
      const bookingMock = {
        id: 'booking-456',
        title: 'Cours de yoga',
        schedule: {
          id: 'schedule-123',
          day: 'Monday',
          hours: '10:00-11:00',
        },
        courses: {
          id: 'course-123',
        },
        user: {
          id: 'user-123',
        },
      } as any;

      // 3. On simule la méthode du service
      (bookingService.create as jest.Mock).mockResolvedValue(bookingMock);

      // 4. Appel du contrôleur
      const result = await controller.create({ userId, createBooking });

      // 5. Vérifications
      expect(bookingService.create).toHaveBeenCalledWith(userId, createBooking);
      expect(result).toEqual(entityToDto(bookingMock));
    });
  });

  describe('delete', () => {
    it('should call bookingService.remove and return void', async () => {
      const bookingId = 'booking-456';
      const userId = 'user-123';

      // Simuler la méthode delete
      bookingService.remove = jest.fn().mockResolvedValue(undefined);

      await controller.delete(bookingId, userId);

      expect(bookingService.remove).toHaveBeenCalledWith(bookingId, userId);
    });
  });

  describe('getBookingByUserId', () => {
    it('should call bookingService.findUserBookings and return DTO', async () => {
      const userId = 'user-123';

      const userBookingMock = {
        id: 'booking-456',
        title: 'Cours de yoga',
        schedule: {
          id: 'schedule-123',
          day: 'Monday',
          hours: '10:00-11:00',
        },
        courses: {
          id: 'course-123',
        },
      } as any;

      (bookingService.findUserBookings as jest.Mock).mockResolvedValue(
        userBookingMock,
      );
      const result = await controller.findUserBookings(userId);
      expect(bookingService.findUserBookings).toHaveBeenCalledWith(userId);
      expect(result).toEqual(userBookingMock);
    });
  });
});
