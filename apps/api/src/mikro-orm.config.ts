import { defineConfig } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { Categories } from './entities/categories.entity';
import { Courses } from './entities/courses.entity';
import { Association } from './entities/association.entity';
dotenv.config();

const mikroOrmConfig = defineConfig({
  entities: [User, Categories, Courses, Association],
  entitiesTs: ['./src/entities'],
  dbName: 'baobbab_db',
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    allOrNothing: true,
    disableForeignKeys: true,
  },
});

export default mikroOrmConfig;
