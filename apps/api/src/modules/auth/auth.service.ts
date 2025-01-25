import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { UserCreateInput } from '../user/inputs/user-create.input';
import { EntityManager } from '@mikro-orm/core';
import { AuthPayloadDto } from './types/auth.types';
import * as bcrypt from 'bcrypt';
import {
  LoginResponse,
  OrganisationRegisterDTO,
  SuperAdminDTO,
} from '@baobbab/dtos';
import { Organisation } from 'src/entities/organisation.entity';
import { SuperAdmin } from 'src/entities/superAdmin.entity';

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

  async validateUser({
    email,
    password,
  }: AuthPayloadDto): Promise<
    Omit<User | Organisation | SuperAdmin, 'password'>
  > {
    const user = await this.em.findOne(User, { email });
    const organisation = await this.em.findOne(Organisation, { email });
    const superAdmin = await this.em.findOne(SuperAdmin, { email });

    const entity = user || organisation || superAdmin;
    if (!entity) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const haschPassword = await bcrypt.hash(password, 10);
    console.log('haschPassword', haschPassword);

    // Comparaison du mot de passe hasché avec celui envoyé
    const passwordValid = await bcrypt.compare(password, entity.password);
    console.log('passwordValid:', passwordValid);

    if (!passwordValid) {
      console.log('password incorrect');
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Logique spécifique à l'organisation (par exemple, vérifie le statut)
    // if (organisation && organisation.status !== Status.ACTIVE) {
    // throw new UnauthorizedException('Organisation not active');
    // }

    // Si tout est valide, on renvoie l'utilisateur sans le password
    const { password: pass, ...result } = entity;
    return result;
  }

  // Générer un JWT après validation avec les informations de l'utilisateur
  async login({
    email,
    password,
  }: AuthPayloadDto): Promise<
    Omit<User, 'password'> & { access_token: string }
  > {
    // On valide l'utilisateur
    const user = await this.validateUser({ email, password });
    // On génère le payload pour le JWT
    const payload = { id: user.id, email: user.email };
    //on génère le token
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });
    return {
      ...user,
      access_token,
    } as Omit<User, 'password'> & { access_token: string };
  }

  async organisationRegister(
    createOrganisation: OrganisationRegisterDTO,
  ): Promise<Omit<Organisation, ' password'> & { access_token: string }> {
    const existingOrganisation = await this.em.findOne(Organisation, {
      siret: createOrganisation.siret,
    });

    if (existingOrganisation) {
      throw new HttpException(
        'Organisation already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const haschPassword = await bcrypt.hash(createOrganisation.password, 10);

    const organisation = this.em.create(Organisation, {
      ...createOrganisation,
      password: haschPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('organisation in service', organisation);

    await this.em.persistAndFlush(organisation);
    const payload = { id: organisation.id, email: organisation.email };
    const secret = this.configService.get('JWT-SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });

    return {
      ...organisation,
      access_token,
    };
  }

  async organisationLogin(
    loginOrganisation: AuthPayloadDto,
  ): Promise<Omit<Organisation, 'password'> & { access_token: string }> {
    // On valide l'utilisateur
    const organisation = await this.validateUser(loginOrganisation);
    // On génère le payload pour le JWT
    const payload = { id: organisation.id, email: organisation.email };
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });

    return {
      ...organisation,
      access_token,
    } as Omit<Organisation, 'password'> & { access_token: string };
  }

  async createSuperAdmin(
    superAdminRegister: SuperAdminDTO,
  ): Promise<Omit<SuperAdmin, 'password'> & { access_token: string }> {
    const existingSuperAdmin = await this.em.findOne(SuperAdmin, {
      username: superAdminRegister.username,
    });
    if (existingSuperAdmin) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    //Haschage du mot de passe
    const haschPassword = await bcrypt.hash(superAdminRegister.password, 10);
    // On créé une instance de l'utilisateur
    const superAdmin = this.em.create(SuperAdmin, {
      ...superAdminRegister,
      password: haschPassword,
      createdAt: new Date().toISOString(),
    });
    // On l'enregistre dans la base de données
    await this.em.persistAndFlush(superAdmin);

    // On génére un JWT pour l'utilisateur nouvellement créé
    const payload = { id: superAdmin.id, email: superAdmin.email };
    // On génère le token
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });
    return {
      ...superAdmin,
      access_token,
    };
  }

  async loginSuperAdmin(
    superAdminLogin: AuthPayloadDto,
  ): Promise<Omit<SuperAdmin, 'password'> & { access_token: string }> {
    const superAdmin = await this.validateUser(superAdminLogin);
    const payload = { id: superAdmin.id, email: superAdmin.email };
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
    });
    return {
      ...superAdmin,
      access_token,
    } as Omit<SuperAdmin, 'password'> & { access_token: string };
  }
}
