import { Migration } from '@mikro-orm/migrations';

export class Migration20250323145939 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "organisation" alter column "siret" type text using ("siret"::text);`,
    );
    this.addSql(
      `alter table "organisation" add constraint "organisation_siret_unique" unique ("siret");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "organisation" drop constraint "organisation_siret_unique";`,
    );

    this.addSql(
      `alter table "organisation" alter column "siret" type bigint using ("siret"::bigint);`,
    );
  }
}
