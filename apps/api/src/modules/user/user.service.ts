import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt'
import { UserDTO } from './dto/user.dtos';
import { User } from '../../entities/user.entity';
import { randomUUID } from 'crypto';
import { UserCreateInput } from './inputs/user-create.input';
import { EntityManager } from '@mikro-orm/core';
import { Query } from '@nestjs/graphql';
import { logger } from '@mikro-orm/nestjs';

// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {

  constructor(
    private readonly em: EntityManager
  ) {}

  async findOneUser(username: string): Promise<User | null> {
    return this.em.findOne(User, { username });
  }

  async findAllUsers(): Promise<User[]>  {
    logger.debug(this.em.find(User, {}))
    return this.em.find(User, {});
  }
}
