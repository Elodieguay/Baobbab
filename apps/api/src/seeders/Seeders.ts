// import { fakerFR as faker } from '@faker-js/faker';

// import { Status, UserRole } from '@baobbab/dtos';
// import { EntityManager } from '@mikro-orm/core';
// import { Organisation } from '../entities/organisation.entity';
// import { OrganisationInfos } from '../entities/organisationInfos.entity';
// import { Courses } from '../entities/courses.entity';
// import { Seeder } from '@mikro-orm/seeder';
// import { Categories } from '../entities/categories.entity';
// import { Point } from '@baobbab/dtos';

// export class CoursesSeeder extends Seeder {
//   async run(em: EntityManager): Promise<void> {
//     // Récupérer toutes les catégories depuis la base de données
//     const categories = await em.find(Categories, {});
//     if (categories.length === 0) {
//       throw new Error('Aucune catégorie trouvée en base de données.');
//     }
//     // Liste de lat/lon pour Nantes Métropole
//     const nantesLocations: { lat: number; lon: number }[] = [
//       { lat: 47.2184, lon: -1.5536 }, // Centre de Nantes
//       { lat: 47.2065, lon: -1.5914 }, // Rezé
//       { lat: 47.2569, lon: -1.5445 }, // Saint-Herblain
//       { lat: 47.322, lon: -1.524 }, // Carquefou
//     ];

//     for (let i = 0; i < 10; i++) {
//       const org = em.create(Organisation, {
//         organisationName: faker.company.name(),
//         siret: faker.number.int({ min: 10000000000000, max: 99999999999999 }),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         status: Status.APPROVED,
//         role: UserRole.ADMIN,
//         createdAt: new Date(),
//       });

//       const orgInfos = em.create(OrganisationInfos, {
//         firstname: faker.person.firstName(),
//         lastname: faker.person.lastName(),
//         phone: faker.phone.number(),
//         address: faker.location.streetAddress(),
//         bio: faker.lorem.sentence(),
//         website: faker.internet.url(),
//         socialMediaInstagram: `https://instagram.com/${faker.internet.userName()}`,
//         socialMediaFaceBook: `https://facebook.com/${faker.internet.userName()}`,
//         socialMediaTwitter: `https://twitter.com/${faker.internet.userName()}`,
//         organisation: org,
//         createdAt: new Date(),
//         image: '',
//       });

//       const location =
//         nantesLocations[Math.floor(Math.random() * nantesLocations.length)];

//       // Sélection d'une catégorie aléatoire
//       const randomCategory =
//         categories[Math.floor(Math.random() * categories.length)];

//       const course = em.create(Courses, {
//         title: faker.commerce.productName(),
//         description: faker.lorem.paragraph(),
//         image: faker.image.url(),
//         days: ['Lundi', 'Mercredi', 'Vendredi'],
//         duration: faker.number.int({ min: 30, max: 120 }),
//         hours: `${faker.number.int({ min: 9, max: 18 })}:00`,
//         price: faker.number.int({ min: 10, max: 100 }),
//         address: faker.location.streetAddress(),
//         city: 'Nantes',
//         position: { lat: location.lat, lng: location.lon } as Point,
//         organisation: org,
//         reminder: 'basket',
//         category: randomCategory, // Ajout de la catégorie
//       });

//       em.persist([org, orgInfos, course]);
//     }
//   }
// }
