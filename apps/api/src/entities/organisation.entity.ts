import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Courses } from './courses.entity';

@Entity()
export class Organisation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text', unique: true })
  name!: string;

  @Property({ type: 'bigint' })
  siret!: number;

  @Property({ type: 'varchar' })
  phone!: string;

  @Property({ type: 'text' })
  address!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'text' })
  password!: string;

  @OneToMany(() => Courses, (course) => course.organisation)
  courses: Courses[];
}
