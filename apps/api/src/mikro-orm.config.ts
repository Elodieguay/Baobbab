import { defineConfig } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Categories } from './entities/categories.entity';
import { Courses } from './entities/courses.entity';
import { Organisation } from './entities/organisation.entity';
dotenv.config();

const mikroOrmConfig = defineConfig({
  entities: [User, Categories, Courses, Organisation],
  entitiesTs: ['./src/entities'],
  dbName: 'baobbab_db',
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  migrations: {
    path: './dist/src/migrations',
    pathTs: './src/migrations',
    allOrNothing: true,
    disableForeignKeys: true,
  },
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
  },
});

export default mikroOrmConfig;
