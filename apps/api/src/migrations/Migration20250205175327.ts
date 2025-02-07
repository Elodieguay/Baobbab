import { Migration } from '@mikro-orm/migrations';

export class Migration20250205175327 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "organisation" drop constraint "organisation_organisation_infos_id_foreign";`,
    );

    this.addSql(
      `alter table "organisation" alter column "organisation_infos_id" drop default;`,
    );
    this.addSql(
      `alter table "organisation" alter column "organisation_infos_id" type uuid using ("organisation_infos_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "organisation" alter column "organisation_infos_id" drop not null;`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_organisation_infos_id_foreign" foreign key ("organisation_infos_id") references "organisation_infos" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "organisation" drop constraint "organisation_organisation_infos_id_foreign";`,
    );

    this.addSql(
      `alter table "organisation" alter column "organisation_infos_id" drop default;`,
    );
    this.addSql(
      `alter table "organisation" alter column "organisation_infos_id" type uuid using ("organisation_infos_id"::text::uuid);`,
    );
    this.addSql(
      `alter table "organisation" alter column "organisation_infos_id" set not null;`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_organisation_infos_id_foreign" foreign key ("organisation_infos_id") references "organisation_infos" ("id") on update cascade on delete no action;`,
    );
  }
}
