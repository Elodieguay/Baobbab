import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { UserCreateInput } from '../user/inputs/user-create.input';
import { EntityManager } from '@mikro-orm/core';
import { logger } from '@mikro-orm/nestjs';
import { LoginResponse } from './types/auth.types';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
 constructor( 
  private readonly userService : UserService,
  private readonly jwtService : JwtService,
  private readonly configService: ConfigService,
  private readonly em: EntityManager
){}

async register(createUserInput: UserCreateInput): Promise<Omit<User, 'password'>> {

  // On vérifie si le user existe déjà
  const existingUser = await this.em.findOne(User, {username:createUserInput.username});
  
  if (existingUser) {
    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  }

  //Haschage du mot de passe
  const haschPassword = await bcrypt.hash(createUserInput.password, 10);
  console.log("haschPassword", haschPassword);
 
  // On créé une instance de l'utilisateur
  const user = this.em.create(User, {...createUserInput, password: haschPassword});

  // On l'enregistre dans la base de données
  await this.em.persistAndFlush(user);

  // On retire le mot de passe de la réponse
  const {password:  pass, ...result} = user
  
  return result

  // On crée un nouvel utilisateur en fake
  // const newUser: User = {
  //   ...createUserInput,
  //   id:randomUUID(),
  // };
  // this.usersRegister.push(newUser);
  // return newUser
}


  async validateUser(username: string, password: string):Promise<Omit<User, 'password'>> {

    const user = await this.em.findOne(User, {username});
    
    console.log('user de validateUser', user);
    console.log('password fourni', password );

    const haschPassword = await bcrypt.hash(password, 10);

    console.log('haschPassword', haschPassword);
    
    console.log('password du user avant comparaison', user?.password);
 
    
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    // Compariason du mot de passe hasché avec celui envoyé
    const passwordValid = await bcrypt.compare(password, user.password);
    
    console.log('passwordValid:', passwordValid);
    
   
    if(!passwordValid){
      console.log('password incorrect');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Si tout est valide, on renvoie l'utilisateur sans le password

    const {password:  pass, ...result} = user
    return result
  }
   
    // Générer un JWT après validation avec les informations de l'utilisateur

  async login(username: string): Promise<LoginResponse> {

    const user = await this.em.findOne(User, {username: username});

    if (!user) {
      throw new Error('User not found');
    }
    // On génère le payload pour le JWT
    const payload = { sub: user.id, username: user.username };
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const secret = this.configService.get('JWT_SECRET');
    console.log('secret dans AuthService:', secret);
    
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret,
      }),
    };
    }

  
}