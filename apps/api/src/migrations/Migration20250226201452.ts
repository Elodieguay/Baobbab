import { Migration } from '@mikro-orm/migrations';

export class Migration20250226201452 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "categories" ("id" uuid not null default gen_random_uuid(), "title" text not null, constraint "categories_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "organisation_infos" ("id" uuid not null default gen_random_uuid(), "firstname" text not null, "lastname" text not null, "phone" varchar(255) not null, "address" text not null, "bio" text not null, "website" text null, "social_media_instagram" text null, "social_media_face_book" text null, "social_media_twitter" text null, "image" text null, "created_at" timestamptz null, "updated_at" timestamptz null, constraint "organisation_infos_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "organisation" ("id" uuid not null default gen_random_uuid(), "role" text check ("role" in ('ADMIN', 'USER', 'SUPERADMIN')) not null default 'ADMIN', "status" text check ("status" in ('PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED', 'DRAFT', 'CANCELLED')) not null default 'PENDING', "organisation_name" text not null, "siret" bigint not null, "email" text not null, "password" text not null, "created_at" timestamptz null, "updated_at" timestamptz null, "organisation_infos_id" uuid null, constraint "organisation_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_organisation_name_unique" unique ("organisation_name");`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_organisation_infos_id_unique" unique ("organisation_infos_id");`,
    );

    this.addSql(
      `create table "courses" ("id" uuid not null default gen_random_uuid(), "title" text not null, "description" text not null, "image" text null, "duration" text not null, "price" text not null, "address" text not null, "city" text null, "reminder" text null, "position" jsonb not null, "category_id" uuid not null, "organisation_id" uuid not null, constraint "courses_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "schedule" ("id" uuid not null, "day" text not null, "hours" text not null, "courses_id" uuid not null, constraint "schedule_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "super_admin" ("id" uuid not null default gen_random_uuid(), "role" text check ("role" in ('ADMIN', 'USER', 'SUPERADMIN')) not null default 'SUPERADMIN', "username" text not null, "email" text not null, "password" text not null, "created_at" timestamptz null, constraint "super_admin_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "super_admin" add constraint "super_admin_username_unique" unique ("username");`,
    );

    this.addSql(
      `create table "user" ("id" uuid not null default gen_random_uuid(), "username" text not null, "email" text not null, "password" text not null, "role" text check ("role" in ('ADMIN', 'USER', 'SUPERADMIN')) not null default 'USER', "created_at" timestamptz null, "updated_at" timestamptz null, constraint "user_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "user" add constraint "user_username_unique" unique ("username");`,
    );

    this.addSql(
      `alter table "organisation" add constraint "organisation_organisation_infos_id_foreign" foreign key ("organisation_infos_id") references "organisation_infos" ("id") on update cascade on delete set null;`,
    );

    this.addSql(
      `alter table "courses" add constraint "courses_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "courses" add constraint "courses_organisation_id_foreign" foreign key ("organisation_id") references "organisation" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "schedule" add constraint "schedule_courses_id_foreign" foreign key ("courses_id") references "courses" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "courses" drop constraint "courses_category_id_foreign";`,
    );

    this.addSql(
      `alter table "organisation" drop constraint "organisation_organisation_infos_id_foreign";`,
    );

    this.addSql(
      `alter table "courses" drop constraint "courses_organisation_id_foreign";`,
    );

    this.addSql(
      `alter table "schedule" drop constraint "schedule_courses_id_foreign";`,
    );

    this.addSql(`drop table if exists "categories" cascade;`);

    this.addSql(`drop table if exists "organisation_infos" cascade;`);

    this.addSql(`drop table if exists "organisation" cascade;`);

    this.addSql(`drop table if exists "courses" cascade;`);

    this.addSql(`drop table if exists "schedule" cascade;`);

    this.addSql(`drop table if exists "super_admin" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);
  }
}
