import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { UserCreateInput } from '../user/inputs/user-create.input';
import { EntityManager } from '@mikro-orm/core';
import { logger } from '@mikro-orm/nestjs';
import { AuthPayloadDto, LoginResponse } from './types/auth.types';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly em: EntityManager,
  ) {}

  async register(
    createUserInput: UserCreateInput,
  ): Promise<Omit<User, 'password'> & { access_token: string }> {
    // On vérifie si le user existe déjà
    const existingUser = await this.em.findOne(User, {
      username: createUserInput.username,
    });
    console.log('existingUser', existingUser);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    //Haschage du mot de passe
    const haschPassword = await bcrypt.hash(createUserInput.password, 10);
    // On créé une instance de l'utilisateur
    const user = this.em.create(User, {
      ...createUserInput,
      password: haschPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // On l'enregistre dans la base de données
    await this.em.persistAndFlush(user);

    // On génére un JWT pour l'utilisateur nouvellement créé
    const payload = { id: user.id, email: user.email };
    // On génère le token
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });
    return {
      ...user,
      access_token, 
    };
 
  }

  async validateUser(
  {email, password}: AuthPayloadDto
  ): Promise<Omit<User, 'password'>> {
    const user = await this.em.findOne(User, { email });
    console.log('user:', user);
    
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const haschPassword = await bcrypt.hash(password, 10);
    console.log('haschPassword', haschPassword);

    // Comparaison du mot de passe hasché avec celui envoyé
    const passwordValid = await bcrypt.compare(password, user.password);
    console.log('passwordValid:', passwordValid);

    if (!passwordValid) {
      console.log('password incorrect');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Si tout est valide, on renvoie l'utilisateur sans le password
    const { password: pass, ...result } = user;
    return result;
  }

  // Générer un JWT après validation avec les informations de l'utilisateur
  async login({email, password}:AuthPayloadDto): Promise<LoginResponse> {
    // On valide l'utilisateur
    const user = await this.validateUser({email, password});
    // On génère le payload pour le JWT
    const payload = { id: user.id, email: user.email };
    //on génère le token
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });
    return {
      access_token,
      userId: user.id,
      username: user.username,
    };
  }
}
