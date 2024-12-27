import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Categories } from './categories.entity';

@Entity()
export class Courses {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text', nullable: true })
  description: string | null = null;

  @Property({ type: 'text', nullable: true })
  image!: string;

  @Property({ type: 'text', nullable: true })
  startDate: Date | null = null;

  @Property({ type: 'text' })
  endDate: Date | null = null;

  @Property({ type: 'text' })
  duration: number;

  @Property({ type: 'text', nullable: true })
  days: string | null = null;

  @Property({ type: 'text', nullable: true })
  price: number | null = null;

  @Property({ type: 'text', nullable: true })
  place: string | null = null;

  @ManyToOne(() => Categories)
  category: Categories;
}
