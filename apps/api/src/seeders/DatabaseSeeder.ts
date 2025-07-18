import { fakerFR as faker } from '@faker-js/faker';
import { Status, UserRole } from '@baobbab/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Organisation } from '../entities/organisation.entity';
import { OrganisationInfos } from '../entities/organisationInfos.entity';
import { Courses } from '../entities/courses.entity';
import { Seeder } from '@mikro-orm/seeder';
import { Categories } from '../entities/categories.entity';
import { Schedule } from '../entities/schedule.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const existing = await em.count(Categories);
    if (existing === 0) {
      const categoryTitles = [
        'Sport',
        'Danse',
        'Arts & Cultures',
        'Bien-être',
        'Vie & Solidarité',
        'Environnement',
        'Evènements',
      ];
      for (const title of categoryTitles) {
        const category = em.create(Categories, { title });
        em.persist(category);
      }
    }
    // Créer une organisation
    // Récupérer toutes les catégories depuis la base de données
    const categories = await em.find(Categories, {});
    if (categories.length === 0) {
      throw new Error('Aucune catégorie trouvée en base de données.');
    }
    const organisationImages = [
      'https://randomuser.me/api/portraits/men/1.jpg',
      'https://randomuser.me/api/portraits/women/2.jpg',
      'https://randomuser.me/api/portraits/men/3.jpg',
      'https://randomuser.me/api/portraits/women/4.jpg',
      'https://randomuser.me/api/portraits/men/5.jpg',
      'https://randomuser.me/api/portraits/women/6.jpg',
    ];

    const courseImages: Record<string, string[]> = {
      Sport: [
        'https://images.unsplash.com/photo-1518458717367-249ba15389d2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
        'https://images.unsplash.com/photo-1593786930094-d5c8164ac771?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
        'https://images.unsplash.com/photo-1474546652694-a33dd8161d66?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
      ],
      Danse: [
        'https://images.unsplash.com/photo-1466554934129-f71df54ebb27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
        'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
      ],
      'Arts & Cultures': [
        'https://images.pexels.com/photos/1570264/pexels-photo-1570264.jpeg?_gl=1*cdd46j*_ga*NTkwNDEzMzY3LjE3NTA1NDk2Mzg.*_ga_8JE65Q40S6*czE3NTA1NDk2MzckbzEkZzEkdDE3NTA1NTAyOTgkajYwJGwwJGgw&w=800&q=75&fm=webp',
        'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?_gl=1*qjvml8*_ga*NTkwNDEzMzY3LjE3NTA1NDk2Mzg.*_ga_8JE65Q40S6*czE3NTA1NDk2MzckbzEkZzEkdDE3NTA1NTAzMjYkajMyJGwwJGgw&w=800&q=75&fm=webp',
      ],
      'Bien-être': [
        'https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
        'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
      ],
      'Vie & Solidarité': [
        'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
        'https://images.unsplash.com/photo-1615897570286-da936a5dfb81?q=80&w=1221&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
      ],
      Environnement: [
        'https://images.unsplash.com/photo-1593739742226-5e5e2fdb1f1c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
        'https://images.unsplash.com/photo-1601758260944-72f34e1b8d57?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&q=75&fm=webp',
      ],
    };

    // Centre de Nantes pour générer des positions uniques
    const centerLat = 47.2184;
    const centerLon = -1.5536;
    const usedLocations = new Set<string>(); // Stocker les positions utilisées

    for (let i = 0; i < 10; i++) {
      const org = em.create(Organisation, {
        organisationName: faker.company.name(),
        siret: faker.string.numeric(14),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: Status.APPROVED,
        role: UserRole.ADMIN,
        createdAt: new Date(),
      });

      const orgInfos = em.create(OrganisationInfos, {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        bio: faker.lorem.paragraphs(),
        website: faker.internet.url(),
        socialMediaInstagram: `https://instagram.com/${faker.internet.username()}`,
        socialMediaFaceBook: `https://facebook.com/${faker.internet.username()}`,
        socialMediaTwitter: `https://twitter.com/${faker.internet.username()}`,
        organisation: org,
        createdAt: new Date(),
        image:
          organisationImages[
            Math.floor(Math.random() * organisationImages.length)
          ],
      });

      // Génération d'une position unique autour de Nantes
      let lat, lon, key;
      do {
        lat = centerLat + (Math.random() * 0.04 - 0.02);
        lon = centerLon + (Math.random() * 0.04 - 0.02);
        key = `${lat.toFixed(6)},${lon.toFixed(6)}`;
      } while (usedLocations.has(key));

      usedLocations.add(key);

      // Sélection d'une catégorie aléatoire
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomCategoryName = randomCategory.title;
      const selectedImages = courseImages[randomCategoryName] || [
        'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?_gl=1*ikdshm*_ga*MzQyNDM4NTk2LjE3NTEzNzY3NjI.*_ga_8JE65Q40S6*czE3NTEzNzY3NjEkbzEkZzAkdDE3NTEzNzY3NjEkajYwJGwwJGgw&w=800&q=75&fm=webp',
      ];
      const courseImage =
        selectedImages[Math.floor(Math.random() * selectedImages.length)];

      const course = em.create(Courses, {
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        image: courseImage,
        duration: faker.number.int({ min: 30, max: 120 }),
        price: faker.number.int({ min: 10, max: 100 }),
        address: faker.location.streetAddress(),
        city: 'Nantes',
        position: {
          lng: lon,
          lat: lat,
        },
        organisation: org,
        reminder: 'basket',
        category: randomCategory,
        booking: [],
      });

      // Ajout des Schedules pour ce Course sans dates spécifiques
      const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
      const scheduleCount = faker.number.int({ min: 1, max: 5 });
      const schedules: Schedule[] = [];

      for (let j = 0; j < scheduleCount; j++) {
        const day = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
        const hour = `${faker.number.int({ min: 8, max: 18 })}:00`;
        const schedule = em.create(Schedule, {
          courses: course,
          day: day,
          hours: hour,
        });
        schedules.push(schedule);
      }

      em.persist(org);
      em.persist(orgInfos);
      em.persist(course);
      em.persist(schedules);
    }
  }
}
