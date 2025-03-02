import { Migration } from '@mikro-orm/migrations';

export class Migration20250226202524 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "schedule" alter column "id" drop default;`);
    this.addSql(
      `alter table "schedule" alter column "id" type uuid using ("id"::text::uuid);`,
    );
    this.addSql(
      `alter table "schedule" alter column "id" set default gen_random_uuid();`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "schedule" alter column "id" drop default;`);
    this.addSql(`alter table "schedule" alter column "id" drop default;`);
    this.addSql(
      `alter table "schedule" alter column "id" type uuid using ("id"::text::uuid);`,
    );
  }
}
