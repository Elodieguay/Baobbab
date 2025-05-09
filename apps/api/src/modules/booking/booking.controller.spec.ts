import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { CreateABooking } from 'src/dtos/booking';
import { entityToDto } from './booking.entityToDto';
describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: BookingService;

  beforeEach(async () => {
    const mockBookingService = {
      create: jest.fn(),
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
    bookingService = module.get<BookingService>(BookingService);
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
});
