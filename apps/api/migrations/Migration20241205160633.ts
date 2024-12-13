import { Migration } from '@mikro-orm/migrations';

export class Migration20241205160633 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" uuid not null default gen_random_uuid(), "username" text not null, "email" text not null, "password" text not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
