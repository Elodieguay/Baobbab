import { Migration } from '@mikro-orm/migrations';

export class Migration20250125211322 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "super_admin" ("id" uuid not null default gen_random_uuid(), "role" text check ("role" in ('ADMIN', 'USER', 'SUPERADMIN')) not null default 'SUPERADMIN', "username" text not null, "email" text not null, "password" text not null, "created_at" timestamptz null, constraint "super_admin_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "super_admin" add constraint "super_admin_username_unique" unique ("username");`,
    );

    this.addSql(
      `alter table "organisation" drop constraint if exists "organisation_role_check";`,
    );

    this.addSql(
      `alter table "user" drop constraint if exists "user_role_check";`,
    );

    this.addSql(
      `alter table "organisation" add constraint "organisation_role_check" check("role" in ('ADMIN', 'USER', 'SUPERADMIN'));`,
    );

    this.addSql(
      `alter table "user" add constraint "user_role_check" check("role" in ('ADMIN', 'USER', 'SUPERADMIN'));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "super_admin" cascade;`);

    this.addSql(
      `alter table "organisation" drop constraint if exists "organisation_role_check";`,
    );

    this.addSql(
      `alter table "user" drop constraint if exists "user_role_check";`,
    );

    this.addSql(
      `alter table "organisation" add constraint "organisation_role_check" check("role" in ('ADMIN', 'USER'));`,
    );

    this.addSql(
      `alter table "user" add constraint "user_role_check" check("role" in ('ADMIN', 'USER'));`,
    );
  }
}
