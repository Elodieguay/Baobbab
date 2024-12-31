import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Categories } from './categories.entity';
import { Organisation } from './organisation.entity';
import { Booking } from './booking.entity';
import { Schedule } from './schedule.entity';
import { Point} from '@baobbab/dtos';


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

  @Property({ type: 'text' })
  duration: number;

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

  @OneToMany(() => Schedule, (schedule) => schedule.courses, {
    cascade: [Cascade.REMOVE],
  })
  schedule = new Collection<Schedule>(this);

  @Property({ type: 'json', nullable: true })
  position: Point | null = null;

  @ManyToOne(() => Categories)
  category: Categories;

  @ManyToOne(() => Organisation)
  organisation: Organisation;

  @OneToMany(() => Booking, (booking) => booking.courses, {
    cascade: [Cascade.REMOVE],
    nullable: true,
  })
  booking = new Collection<Booking>(this);
}
