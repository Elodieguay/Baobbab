import { defineConfig } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Categories } from './entities/categories.entity';
import { Courses } from './entities/courses.entity';
import { Organisation } from './entities/organisation.entity';
import { Booking } from './entities/booking.entity';
import { OrganisationInfos } from './entities/organisationInfos.entity';
import { Schedule } from './entities/schedule.entity';
import { SuperAdmin } from './entities/superAdmin.entity';
import { SeedManager } from '@mikro-orm/seeder';
dotenv.config();

const mikroOrmConfig = defineConfig({
  entities: [
    User,
    Categories,
    Courses,
    Organisation,
    Booking,
    OrganisationInfos,
    Schedule,
    SuperAdmin,
  ],
  entitiesTs: ['./src/entities'],
  dbName: 'baobbab_db',
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  migrations: {
    path: './dist/src/migrations',
    pathTs: './src/migrations',
    allOrNothing: true,
    disableForeignKeys: false,
  },
  seeder: {
    path: './dist/src/seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
  extensions: [SeedManager],
});

export default mikroOrmConfig;
