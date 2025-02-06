import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Organisation } from './organisation.entity';

@Entity()
export class OrganisationInfos {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text' })
  firstname: string;

  @Property({ type: 'text' })
  lastname: string;

  @Property({ type: 'varchar' })
  phone!: string;

  @Property({ type: 'text' })
  address!: string;

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

  @OneToOne(() => Organisation, { mappedBy: 'organisationInfos' })
  organisation?: Organisation;
}
