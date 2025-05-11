import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Courses } from './courses.entity';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Booking {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ type: 'text' })
  title: string;

  @OneToOne(() => Schedule, (schedule) => schedule.booking, {
    owner: true,
    cascade: [Cascade.REMOVE],
    orphanRemoval: true,
  })
  schedule: Schedule;

  @ManyToOne(() => Courses, { nullable: true })
  courses: Courses;

  @ManyToOne(() => User, { nullable: false })
  user: User;
}
