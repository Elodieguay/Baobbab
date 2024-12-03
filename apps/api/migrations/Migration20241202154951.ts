import { Migration } from '@mikro-orm/migrations';

export class Migration20241202154951 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "association" ("id" uuid not null default gen_random_uuid(), "name" text not null, "siret" bigint not null, "phone" varchar(255) not null, "address" text not null, "email" text not null, "password" text not null, constraint "association_pkey" primary key ("id"));`);
    this.addSql(`alter table "association" add constraint "association_name_unique" unique ("name");`);

    this.addSql(`create table "categories" ("id" uuid not null default gen_random_uuid(), "title" text not null, constraint "categories_pkey" primary key ("id"));`);

    this.addSql(`create table "courses" ("id" uuid not null default gen_random_uuid(), "title" text not null, "description" text null, "image" text null, "start_date" text null, "end_date" text null, "duration" text not null, "days" text null, "price" text null, "place" text null, "category_id" uuid not null, constraint "courses_pkey" primary key ("id"));`);

    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "username" text not null, "email" text not null, "password" text not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);

    this.addSql(`alter table "courses" add constraint "courses_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "courses" drop constraint "courses_category_id_foreign";`);

    this.addSql(`drop table if exists "association" cascade;`);

    this.addSql(`drop table if exists "categories" cascade;`);

    this.addSql(`drop table if exists "courses" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);
  }

}
