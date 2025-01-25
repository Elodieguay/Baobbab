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

  @Property({ type: 'text', nullable: true })
  description: string | null = null;

  @Property({ type: 'text', nullable: true })
  image: string;

  @Property({ type: 'array' })
  days: string[];

  @Property({ type: 'text' })
  duration: number;

  @Property({ type: 'text', nullable: true })
  price: number | null = null;

  @Property({ type: 'text', nullable: true })
  address: string | null = null;

  @Property({ type: 'json', nullable: true })
  position: Point | null = null;

  @ManyToOne(() => Categories)
  category: Categories;

  @ManyToOne(() => Organisation)
  organisation: Organisation;
}
