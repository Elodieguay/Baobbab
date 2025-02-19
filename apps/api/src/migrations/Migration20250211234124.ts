import { Migration } from '@mikro-orm/migrations';

export class Migration20250211234124 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_instagram" type text using ("social_media_instagram"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_instagram" drop not null;`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_face_book" type text using ("social_media_face_book"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_face_book" drop not null;`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_twitter" type text using ("social_media_twitter"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_twitter" drop not null;`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "image" type text using ("image"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "image" drop not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_instagram" type text using ("social_media_instagram"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_instagram" set not null;`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_face_book" type text using ("social_media_face_book"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_face_book" set not null;`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_twitter" type text using ("social_media_twitter"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "social_media_twitter" set not null;`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "image" type text using ("image"::text);`,
    );
    this.addSql(
      `alter table "organisation_infos" alter column "image" set not null;`,
    );
  }
}
