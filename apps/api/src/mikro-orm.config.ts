import { defineConfig } from '@mikro-orm/postgresql';
import * as dotenv from 'dotenv';
dotenv.config();

const mikroOrmConfig = defineConfig({
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'baobbab_db',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: true,
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    allOrNothing: true,
    disableForeignKeys: true,
  },
});

export default mikroOrmConfig;
