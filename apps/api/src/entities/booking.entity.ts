import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Courses } from './courses.entity';
import { User } from './user.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Booking {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property({ type: 'text' })
  title: string;

  @ManyToOne(() => Schedule, { nullable: true })
  schedule: Schedule;

  @ManyToOne(() => Courses, { nullable: true })
  courses: Courses;

  @ManyToOne(() => User, { nullable: false })
  user: User;
}
