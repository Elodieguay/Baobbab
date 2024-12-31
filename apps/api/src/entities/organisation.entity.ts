import {
  Entity,
  Enum,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Courses } from './courses.entity';
import {  UserRole } from '@baobbab/dtos';
import { OrganisationInfos } from './organisationInfos.entity';
import { Status } from '@baobbab/dtos';

@Entity()
export class Organisation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Enum({ items: () => UserRole, default: UserRole.ADMIN })
  role!: UserRole.ADMIN;

  @Enum({ items: () => Status, default: Status.PENDING })
  status!: Status;

  @Property({ type: 'text', unique: true })
  organisationName!: string;

  @Property({ type: 'text', unique: true })
  siret!: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'text' })
  password!: string;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @OneToOne(
    () => OrganisationInfos,
    (organisationInfos) => organisationInfos.organisation,
    { owner: true, nullable: true },
  )
  organisationInfos?: OrganisationInfos;

  @OneToMany(() => Courses, (course) => course.organisation)
  courses?: Courses[];
}
