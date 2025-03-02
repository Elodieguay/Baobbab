import { Migration } from '@mikro-orm/migrations';

export class Migration20250228174233 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "booking" ("id" uuid not null default gen_random_uuid(), "title" text not null, "schedule_id" uuid not null, "courses_id" uuid null, constraint "booking_pkey" primary key ("id"));`,
    );
    this.addSql(
      `alter table "booking" add constraint "booking_schedule_id_unique" unique ("schedule_id");`,
    );

    this.addSql(
      `alter table "booking" add constraint "booking_schedule_id_foreign" foreign key ("schedule_id") references "schedule" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "booking" add constraint "booking_courses_id_foreign" foreign key ("courses_id") references "courses" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "booking" cascade;`);
  }
}
