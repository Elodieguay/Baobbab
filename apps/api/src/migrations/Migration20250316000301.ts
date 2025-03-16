import { Migration } from '@mikro-orm/migrations';

export class Migration20250316000301 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "booking" add column "user_id" uuid not null;`);
    this.addSql(
      `alter table "booking" add constraint "booking_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "booking" drop constraint "booking_user_id_foreign";`,
    );

    this.addSql(`alter table "booking" drop column "user_id";`);
  }
}
