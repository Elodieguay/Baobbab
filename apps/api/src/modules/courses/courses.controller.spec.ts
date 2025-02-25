import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Collection, EntityManager } from '@mikro-orm/core';
import { courseToDto } from './courses.entityToDto';
import { Courses } from 'src/entities/courses.entity';
import { logger } from '@mikro-orm/nestjs';

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
    const categoryId = 'sport';
    const mockCourses = [
      {
        id: 'affgdhodcd',
        title: 'yoga style',
        description: 'pourquoi pas dans le dhors dnaas le noir',
        image: 'https://www.google.com',
        days: ['lundi', 'mardi'],
        duration: 1,
        hours: '18h30',
        price: 50,
        address: '20 rue la pete 44000 nantes',
        city: 'Nantes',
        reminder: 'chaussures de sport',
        position: { lat: 45.66665, lng: -1.56999 },
        category: {
          id: 'yoga',
          title: 'Yoga',
          courses: new Collection<Courses>({}),
        },
        organisation: {
          id: 'hddhhdjhdjd',
          role: UserRole.ADMIN,
          status: Status.APPROVED,
          organisationName: 'Yoga Company',
          siret: 123456789,
          address: '10 rue des lotus, 44000 Nantes',
          email: 'contact@yogacompany.com',
          phone: '01 23 45 67 89',
          website: 'https://www.yogacompany.com',
          password: 'password123',
          createdAt: new Date(),
        },
      },
      {
        id: 'eyyfjifdjigi',
        title: 'marche nordique',
        description: 'sport intense et fitness pour tous tous',
        image: 'https://www.google.com',
        days: ['lundi', 'mercredi'],
        duration: 1,
        hours: '18h30',
        price: 50,
        address: '20 rue la pete 44000 nantes',
        city: 'Nantes',
        reminder: 'chaussures de sport',
        position: { lat: 45.66665, lng: -1.56999 },
        category: {
          id: 'sport',
          title: 'Sport',
          courses: new Collection<Courses>({}),
        },
        organisation: {
          id: 'hdfrrrrfrrrr',
          role: UserRole.ADMIN,
          status: Status.APPROVED,
          organisationName: 'Yoga Company',
          siret: 123456789,
          address: '20 rue la pete 44000 nantes',
          email: 'contact@yogacompany.com',
          phone: '01 23 45 67 89',
          website: 'https://www.yogacompany.com',
          password: 'password123',
          createdAt: new Date(),
        },
      },
    ];
    const coursesDto = courseToDto(mockCourses);
    jest.spyOn(service, 'findCoursesByCategory').mockResolvedValue(mockCourses);
    const response = await request(app.getHttpServer())
      .get(`/courses?categoryId=${categoryId}`)
      .expect(200);

    expect(response.body).toEqual([
      {
        id: 'affgdhodcd',
        title: 'yoga style',
        address: '20 rue la pete 44000 nantes',
        city: 'Nantes',
        description: 'pourquoi pas dans le dhors dnaas le noir',
        duration: 1,
        days: ['lundi', 'mardi'],
        hours: '18h30',
        price: 50,
        reminder: 'chaussures de sport',
        category: {
          id: 'yoga',
          title: 'Yoga',
        },
        image: 'https://www.google.com',
        position: {
          type: 'Point',
          coordinates: [-1.56999, 45.66665],
        },
        organisationId: 'hddhhdjhdjd',
      },
      {
        id: 'eyyfjifdjigi',
        title: 'marche nordique',
        address: '20 rue la pete 44000 nantes',
        city: 'Nantes',
        description: 'sport intense et fitness pour tous tous',
        duration: 1,
        days: ['lundi', 'mercredi'],
        hours: '18h30',
        price: 50,
        reminder: 'chaussures de sport',
        category: {
          id: 'sport',
          title: 'Sport',
        },
        image: 'https://www.google.com',
        position: {
          type: 'Point',
          coordinates: [-1.56999, 45.66665],
        },
        organisationId: 'hdfrrrrfrrrr',
      },
    ]);

    expect(service.findCoursesByCategory).toHaveBeenCalledWith(categoryId);
  });
});
