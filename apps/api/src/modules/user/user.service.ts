import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt'
import { UserDTO } from './dto/user.dtos';
import { User } from '../../entities/user.entity';
import { randomUUID } from 'crypto';
import { UserCreateInput } from './inputs/user-create.input';
import { EntityManager } from '@mikro-orm/core';
import { Query } from '@nestjs/graphql';

// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {

 private readonly users = [
   {id: 1, username: "test", password: "test1"},
   {id: 2, username: "jean", password: "jean2"}, 
 ]

 private readonly usersRegister = [
  {id: "1", username: "test", password: "test1", email: "test1@test.com"},
  {id: "2", username: "jean", password: "jean2", email: "jean2@test.com"},
]
  constructor(
    private readonly em: EntityManager
  ) {}

  async findOneUser(username: string): Promise<User | null> {
    return this.em.findOne(User, { username });
}


}
