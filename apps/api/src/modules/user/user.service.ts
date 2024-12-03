import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt'
import { UserDTO } from './dto/user.dtos';
import { User } from '../../entities/user.entity';
import { randomUUID } from 'crypto';
import { UserCreateInput } from './inputs/user-create.input';
import { EntityManager } from '@mikro-orm/core';

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

  findOneUser(username: string): UserDTO | undefined {
    const user = this.usersRegister.find((user) => user.username === username);  
    if (!user) {
      throw new Error('User not found');
    }
    return user 
  }

  // async validatePassword(userName: string, plainPassword: string): Promise<boolean> {
  //   const user = this.findOne(userName);
  //   if (!user) {
  //     return false;
  //   }
  //   // Compare le mot de passe en clair avec le haché
  //   return bcrypt.compare(plainPassword, user.password);
  // }

  async createUser(createUserInput: UserCreateInput): Promise<User> {
    
    const existingUser = await this.em.findOne(User, {username:createUserInput.username});
    if (existingUser) {
      throw new Error('User already exists');
    }
    // On créé une instance de l'utilisateur
    const user = this.em.create(User, createUserInput);
    // On l'enregistre dans la base de données
    await this.em.persistAndFlush(user);
    return user

    // On crée un nouvel utilisateur en fake
    // const newUser: User = {
    //   ...createUserInput,
    //   id:randomUUID(),
    // };
    // this.usersRegister.push(newUser);
    // return newUser
  }

}
