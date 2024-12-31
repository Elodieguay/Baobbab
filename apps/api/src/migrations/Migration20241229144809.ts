import { Migration } from '@mikro-orm/migrations';

export class Migration20241229144809 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "organisation" ("id" uuid not null default gen_random_uuid(), "name" text not null, "siret" bigint not null, "phone" varchar(255) not null, "address" text not null, "email" text not null, "password" text not null, constraint "organisation_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_name_unique" unique ("name");`,
    );

    this.addSql(`drop table if exists "association" cascade;`);

    this.addSql(
      `alter table "courses" add column "position" jsonb null, add column "organisation_id" uuid not null;`,
    );
    this.addSql(
      `alter table "courses" add constraint "courses_organisation_id_foreign" foreign key ("organisation_id") references "organisation" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "courses" drop constraint "courses_organisation_id_foreign";`,
    );

    this.addSql(
      `create table "association" ("id" uuid not null default gen_random_uuid(), "name" text not null, "siret" int8 not null, "phone" varchar(255) not null, "address" text not null, "email" text not null, "password" text not null, constraint "association_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "association" add constraint "association_name_unique" unique ("name");`,
    );

    this.addSql(`drop table if exists "organisation" cascade;`);

    this.addSql(
      `alter table "courses" drop column "position", drop column "organisation_id";`,
    );
  }
}
