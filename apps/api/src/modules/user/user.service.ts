import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { EntityManager } from '@mikro-orm/core';
import { logger } from '@mikro-orm/nestjs';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findOneUserById(userId: string): Promise<User | null> {
    return this.em.findOne(User, { id: userId });
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async findAllUsers(): Promise<User[]> {
    logger.debug(this.em.find(User, {}));
    return this.em.find(User, {});
  }

  async updateUser(user: User): Promise<User> {
    await this.em.persistAndFlush(user);
    return user;
  }
}
