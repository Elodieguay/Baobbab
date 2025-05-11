import { UserRole } from '@baobbab/dtos';
import { Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Booking } from './booking.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text', unique: true })
  username?: string;

  @Property({ type: 'text' })
  email!: string;

  @Property({ type: 'text' })
  password!: string;

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role!: UserRole.USER;

  @Property({ onCreate: () => new Date(), nullable: true })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
