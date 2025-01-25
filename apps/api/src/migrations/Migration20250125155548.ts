import { Migration } from '@mikro-orm/migrations';

export class Migration20250125155548 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "organisation" drop constraint "organisation_name_unique";`,
    );

    this.addSql(
      `alter table "organisation" add column "role" text check ("role" in ('ADMIN', 'USER')) not null default 'ADMIN', add column "status" text check ("status" in ('PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED', 'DRAFT', 'CANCELLED')) not null default 'PENDING', add column "lastname" text not null, add column "organisation_name" text not null, add column "bio" text not null, add column "web_site" text not null, add column "social_media_instagram" text not null, add column "social_media_face_book" text not null, add column "social_media_twitter" text not null, add column "image" text not null, add column "created_at" timestamptz null, add column "updated_at" timestamptz null;`,
    );
    this.addSql(
      `alter table "organisation" rename column "name" to "firstname";`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_organisation_name_unique" unique ("organisation_name");`,
    );

    this.addSql(
      `alter table "courses" drop column "start_date", drop column "end_date", drop column "place";`,
    );

    this.addSql(`alter table "courses" add column "address" text null;`);
    this.addSql(
      `alter table "courses" alter column "days" type text[] using ("days"::text[]);`,
    );
    this.addSql(`alter table "courses" alter column "days" set not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "organisation" drop constraint "organisation_organisation_name_unique";`,
    );
    this.addSql(
      `alter table "organisation" drop column "role", drop column "status", drop column "lastname", drop column "organisation_name", drop column "bio", drop column "web_site", drop column "social_media_instagram", drop column "social_media_face_book", drop column "social_media_twitter", drop column "image", drop column "created_at", drop column "updated_at";`,
    );

    this.addSql(
      `alter table "organisation" rename column "firstname" to "name";`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_name_unique" unique ("name");`,
    );

    this.addSql(
      `alter table "courses" add column "end_date" text null, add column "place" text null;`,
    );
    this.addSql(
      `alter table "courses" alter column "days" type text using ("days"::text);`,
    );
    this.addSql(`alter table "courses" alter column "days" drop not null;`);
    this.addSql(
      `alter table "courses" rename column "address" to "start_date";`,
    );
  }
}
