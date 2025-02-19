import { Migration } from '@mikro-orm/migrations';

export class Migration20250211234606 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "organisation_infos" drop column "web_site";`);

    this.addSql(
      `alter table "organisation_infos" add column "website" text null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "organisation_infos" drop column "website";`);

    this.addSql(
      `alter table "organisation_infos" add column "web_site" text not null;`,
    );
  }
}
