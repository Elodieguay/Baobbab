import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Courses } from './courses.entity';
import { Booking } from './booking.entity';

@Entity()
export class Schedule {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text' })
  day!: string;

  @Property({ type: 'text' })
  hours!: string;

  @ManyToOne(() => Courses)
  courses!: Courses;
}
