import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { EntityManager } from '@mikro-orm/core';
import { Courses } from 'src/entities/courses.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let controller: CoursesController;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        CoursesController,
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

    service = module.get<CoursesService>(CoursesService);
    controller = module.get<CoursesController>(CoursesController);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create a course', async ()=>{
  //   const result= service.create()
  // })
  describe('findAll', () => {
    it('should find all courses', async () => {
      const mockCourses = [
        {
          id: 'affgdhodcd',
          title: 'yoga style',
          address: '20 rue la pete 44000 nantes',
          city: 'Nantes',
          description: 'pourquoi pas dans le dhors dnaas le noir',
          duration: '1h30',
          days: 'lundi, mardi',
          hours: '18h30',
          price: 50,
          reminder: 'chaussures de sport',
          category: 'yoga',
          image: 'https://www.google.com',
          position: {
            type: 'Point',
            coordinates: [-1.56999, 45.66665],
          },
          organisationId: 'hddhhdjhdjd',
        },
      ];
      jest.spyOn(em, 'find').mockResolvedValue(mockCourses);
      const result = await service.findAll();
      expect(result).toEqual(mockCourses);
    });
  });

  describe('findCoursesByCategory', () => {
    it('should find courses by category', async () => {
      const mockCoursesByCategory = [
        {
          id: 'affgdhodcd',
          title: 'yoga style',
          address: '20 rue la pete 44000 nantes',
          city: 'Nantes',
          description: 'pourquoi pas dans le dhors dnaas le noir',
          duration: '1h30',
          days: 'lundi, mardi',
          hours: '18h30',
          price: 50,
          reminder: 'chaussures de sport',
          category: {
            id: 'yoga',
          },
          image: 'https://www.google.com',
          position: {
            type: 'Point',
            coordinates: [-1.56999, 45.66665],
          },
          organisationId: 'hddhhdjhdjd',
        },
        {
          id: 'yrhkzlzlzlzz',
          title: 'marche nordique',
          address: '80 rue Auvergne 44000 nantes',
          city: 'Nantes',
          description: 'sport intense et fitness pour tous tous',
          duration: '4h30',
          days: 'lundi, mercredi',
          hours: '10h30',
          price: 20,
          reminder: 'chaussures de sport',
          category: { id: 'sport' },
          image: 'https://www.google.com',
          position: {
            type: 'Point',
            coordinates: [-1.58999, 45.69665],
          },
          organisationId: 'hddhhdjhdjert',
        },
      ];

      jest.spyOn(em, 'find').mockResolvedValue(mockCoursesByCategory);
      const result = await service.findCoursesByCategory('sport');
      expect(result).toEqual(mockCoursesByCategory);
      expect(em.find).toHaveBeenCalledWith(Courses, {
        category: { id: 'sport' },
      });
    });
  });
});
