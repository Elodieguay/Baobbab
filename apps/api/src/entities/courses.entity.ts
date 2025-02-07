import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Categories } from './categories.entity';
import { Organisation } from './organisation.entity';
import { Point } from '@baobbab/dtos';

@Entity()
export class Courses {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description: string;

  @Property({ type: 'text', nullable: true })
  image: string;

  @Property({ type: 'array' })
  days: string[];

  @Property({ type: 'text' })
  duration: number;

  @Property({ type: 'text' })
  hours: string;

  @Property({ type: 'text' })
  price: number;

  @Property({ type: 'text' })
  address: string;

  @Property({ type: 'text', nullable: true })
  city: string | null = null;

  @Property({ type: 'text', nullable: true })
  reminder: string | null = null;

  @Property({ type: 'json' })
  position: Point;

  @ManyToOne(() => Categories)
  category: Categories;

  @ManyToOne(() => Organisation)
  organisation: Organisation;
}
