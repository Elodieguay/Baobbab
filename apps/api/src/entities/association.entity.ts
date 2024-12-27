import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Association {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text', unique: true })
  name!: string;

  @Property({ type: 'bigint' })
  siret!: number;

  @Property({ type: 'varchar' })
  phone!: number;

  @Property({ type: 'text' })
  address!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'text' })
  password!: string;
}
