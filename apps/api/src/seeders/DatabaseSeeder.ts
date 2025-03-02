import { fakerFR as faker } from '@faker-js/faker';

import { Status, UserRole } from '@baobbab/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Organisation } from '../entities/organisation.entity';
import { OrganisationInfos } from '../entities/organisationInfos.entity';
import { Courses } from '../entities/courses.entity';
import { Seeder } from '@mikro-orm/seeder';
import { Categories } from '../entities/categories.entity';
import { Point } from '@baobbab/dtos';
import { Schedule } from '../entities/schedule.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // 1️⃣ Créer une organisation
    // Récupérer toutes les catégories depuis la base de données
    const categories = await em.find(Categories, {});
    if (categories.length === 0) {
      throw new Error('Aucune catégorie trouvée en base de données.');
    }
    // Liste de lat/lon pour Nantes Métropole
    //  const nantesLocations: { lat: number; lon: number }[] = [
    //    { lat: 47.2184, lon: -1.5536 }, // Centre de Nantes
    //    { lat: 47.2065, lon: -1.5914 }, // Rezé
    //    { lat: 47.2569, lon: -1.5445 }, // Saint-Herblain
    //    { lat: 47.322, lon: -1.524 }, // Carquefou
    //  ];

    // 2️⃣ Centre de Nantes pour générer des positions uniques
    const centerLat = 47.2184;
    const centerLon = -1.5536;
    const usedLocations = new Set<string>(); // Stocker les positions utilisées

    for (let i = 0; i < 10; i++) {
      const org = em.create(Organisation, {
        organisationName: faker.company.name(),
        siret: faker.number.int({ min: 10000000000000, max: 99999999999999 }),
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
        bio: faker.lorem.sentence(),
        website: faker.internet.url(),
        socialMediaInstagram: `https://instagram.com/${faker.internet.username()}`,
        socialMediaFaceBook: `https://facebook.com/${faker.internet.username()}`,
        socialMediaTwitter: `https://twitter.com/${faker.internet.username()}`,
        organisation: org,
        createdAt: new Date(),
        image: '',
      });

      //  const location =
      //  nantesLocations[Math.floor(Math.random() * nantesLocations.length)];

      // 3️⃣ Génération d'une position unique autour de Nantes
      let lat, lon, key;
      do {
        lat = centerLat + (Math.random() * 0.04 - 0.02); // ± 0.02 degrés
        lon = centerLon + (Math.random() * 0.04 - 0.02);
        key = `${lat.toFixed(6)},${lon.toFixed(6)}`; // Format unique pour éviter les doublons
      } while (usedLocations.has(key));

      usedLocations.add(key); // Ajouter la position à l'ensemble des utilisées

      // // Récupère maintenant les catégories pour les utiliser dans les cours
      // const categories = await em.find(Categories, {});

      // Sélection d'une catégorie aléatoire
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const course = em.create(Courses, {
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        image: faker.image.url(),
        duration: faker.number.int({ min: 30, max: 120 }),
        price: faker.number.int({ min: 10, max: 100 }),
        address: faker.location.streetAddress(),
        city: 'Nantes',
        position: { lat, lng: lon } as Point,
        organisation: org,
        reminder: 'basket',
        category: randomCategory, // Ajout de la catégorie
      });

      // Ajout des Schedules pour ce Course sans dates spécifiques
      const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
      const scheduleCount = faker.number.int({ min: 1, max: 5 }); // Créer entre 1 et 5 horaires pour chaque cours
      const schedules: Schedule[] = [];

      for (let j = 0; j < scheduleCount; j++) {
        const day = daysOfWeek[Math.floor(Math.random() * daysOfWeek.length)];
        const hour = `${faker.number.int({ min: 8, max: 18 })}:00`; // Horaire entre 8h00 et 18h00
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
