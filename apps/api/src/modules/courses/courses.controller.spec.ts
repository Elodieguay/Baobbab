import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EntityManager } from '@mikro-orm/core';
import { courseToDto } from './courses.entityToDto';
import { Courses } from 'src/entities/courses.entity';
import { coursesMock } from './mockCourses';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPERADMIN = 'SUPERADMIN',
}

enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
  CANCELLED = 'CANCELLED',
}

describe('CoursesController (e2e)', () => {
  let controller: CoursesController;
  let service: CoursesService;
  let app: INestApplication;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        CoursesService,
        {
          provide: EntityManager,
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            persistAndFlush: jest.fn(),
          },
        },
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
    em = module.get<EntityManager>(EntityManager);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET/courses should return courses of given category', async () => {
    const categoryId = 'cat1';
    const mockedCourses = [
      {
        id: '1',
        title: 'Yoga',
        description: 'Relaxation',
        image: 'yoga.jpg',
        duration: 60,
        price: 25,
        address: 'Rue des fleurs',
        city: 'Nantes',
        reminder: '1h avant',
        position: { lat: 47.218, lng: -1.553 },
        category: { id: 'cat1', title: 'Bien-être' },
        organisation: { id: 'org1', name: 'Zen School' },
        schedule: [
          {
            id: 's1',
            day: 'Monday',
            hours: '10:00-11:00',
          },
        ],
        booking: {
          isInitialized: () => true,
          getItems: () => [
            {
              title: 'Cours 1',
              courses: { id: '1' },
              schedule: { id: 's1', day: 'Monday', hours: '10:00-11:00' },
            },
          ],
        },
      },
      {
        id: '2',
        title: 'Pilates',
        description: 'Core strength',
        image: 'pilates.jpg',
        duration: 45,
        price: 20,
        address: 'Avenue des sports',
        city: 'Nantes',
        reminder: '30 min avant',
        position: { lat: 47.218, lng: -1.553 },
        category: { id: 'cat2', title: 'Fitness' },
        organisation: { id: 'org2', name: 'Fit Club' },
        schedule: [
          {
            id: 's2',
            day: 'Wednesday',
            hours: '18:00-19:00',
          },
        ],
        booking: [],
      },
    ];
    const mockCourses = [coursesMock()] as Courses[];

    const coursesDto = courseToDto(mockCourses);
    jest.spyOn(service, 'findCoursesByCategory').mockResolvedValue(mockCourses);
    const response = await request(app.getHttpServer())
      .get(`/courses?categoryId=${categoryId}`)
      .expect(200);
    const dto = courseToDto(mockCourses);
    expect(response.body).toEqual(dto);
  });
});
