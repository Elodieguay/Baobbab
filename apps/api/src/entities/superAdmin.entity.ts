import { UserRole } from '@baobbab/dtos';
import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class SuperAdmin {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Enum({ items: () => UserRole, default: UserRole.SUPERADMIN })
  role!: UserRole;

  @Property({ type: 'text', unique: true })
  username!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'text' })
  password!: string;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt: Date = new Date();
}
