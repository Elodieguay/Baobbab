import { defineConfig } from "@mikro-orm/postgresql";
import * as dotenv from "dotenv";
dotenv.config();

const mikroOrmConfig =  defineConfig({
    entities: ["dist/entities"],
    entitiesTs: ["src/entities"],
    dbName: 'baobbab_db',
    host: 'localhost' ,
    port: 5435,
    user: 'postgres',
    password: 'ponpon',
    debug: true,
    migrations: {
        path: './migrations',
        allOrNothing: true,
        disableForeignKeys: true,
    }
     
});

export default mikroOrmConfig;   