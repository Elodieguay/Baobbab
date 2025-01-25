import { Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Courses } from './courses.entity';
import { Status, UserRole } from '@baobbab/dtos';

@Entity()
export class Organisation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Enum({ items: () => UserRole, default: UserRole.ADMIN })
  role!: UserRole;

  @Enum({ items: () => Status, default: Status.PENDING })
  status!: Status;

  @Property({ type: 'text' })
  firstname: string;

  @Property({ type: 'text' })
  lastname: string;

  @Property({ type: 'text', unique: true })
  organisationName!: string;

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

  @Property({ type: 'text' })
  bio: string;

  @Property({ type: 'text' })
  webSite?: string;

  @Property({ type: 'text' })
  socialMediaInstagram?: string;

  @Property({ type: 'text' })
  socialMediaFaceBook?: string;

  @Property({ type: 'text' })
  socialMediaTwitter?: string;

  @Property({ type: 'text' })
  image: string;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @OneToMany(() => Courses, (course) => course.organisation)
  courses?: Courses[];
}
