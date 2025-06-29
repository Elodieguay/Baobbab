import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { EntityManager } from '@mikro-orm/core';
import { AuthPayloadDto } from './types/auth.types';
import * as bcrypt from 'bcryptjs';
import { logger } from '@mikro-orm/nestjs';
import {
  OrganisationRegisterDTO,
  Status,
  UserRegisterDTO,
  UserRole,
} from '@baobbab/dtos';
import { Organisation } from 'src/entities/organisation.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly em: EntityManager,
    // private readonly emailService: EmailService,
    // private readonly cloudinaryService: CloudinaryService,
  ) {}

  onModuleInit() {
    if (this.jwtService) {
      logger.log(
        'JwtService Injected jwt moduleinit Auth:',
        JSON.stringify(this.jwtService, null, 2),
      );
    } else {
      logger.warn('auth JwtService is undefined during initialization!');
    }
  }

  async register(
    createUserInput: UserRegisterDTO,
  ): Promise<
    Omit<User, 'password'> & { access_token: string; refresh_token: string }
  > {
    const existingUser = await this.em.findOne(User, {
      username: createUserInput.username,
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const haschPassword = await bcrypt.hash(createUserInput.password, 10);

    // it create an instance of the user
    const user = this.em.create(User, {
      ...createUserInput,
      role: UserRole.USER,
      password: haschPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookings: [],
    });
    await this.em.persistAndFlush(user);

    const payload = { id: user.id, email: user.email, role: user.role };

    // it generate a token
    const secret = this.configService.get('JWT_SECRET');
    logger.debug('secret', secret);
    const secretRefresh = this.configService.get('JWT_REFRESH_SECRET');
    logger.debug('secretRefresh', secretRefresh);
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '5m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: secretRefresh,
      expiresIn: '7d',
    });
    return {
      ...user,
      access_token,
      refresh_token,
    };
  }

  async validateUser({
    email,
    password,
  }: AuthPayloadDto): Promise<Omit<User | Organisation, 'password'>> {
    const user = await this.em.findOne(User, { email });
    const organisation = await this.em.findOne(Organisation, { email });
    // const superAdmin = await this.em.findOne(SuperAdmin, { email });

    const entity = user || organisation;
    if (!entity) {
      logger.error('Invalid credentials', HttpStatus.UNAUTHORIZED);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare of the password hash with the password sent

    const passwordValid = await bcrypt.compare(password, entity.password);

    if (!passwordValid) {
      logger.error('Invalid credentials', HttpStatus.UNAUTHORIZED);
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const { password: pass, ...result } = entity;
    return result;
  }

  // Générer un JWT après validation avec les informations de l'utilisateur
  async login({
    email,
    password,
  }: AuthPayloadDto): Promise<
    Omit<User, 'password'> & { access_token: string; refresh_token: string }
  > {
    // we validate the user with email and password
    const user = await this.validateUser({ email, password });
    // we generate the payload for the JWT
    const payload = { id: user.id, email: user.email, role: user.role };
    //we generate the token
    const secret = this.configService.get('JWT_SECRET');
    const secretRefresh = this.configService.get('JWT_REFRESH_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '2m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: secretRefresh,
      expiresIn: '7d',
    });
    return {
      ...user,
      access_token,
      refresh_token,
    } as Omit<User, 'password'> & {
      access_token: string;
      refresh_token: string;
    };
  }

  async refreshToken(refreshTokenValue: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshTokenValue, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      const user = await this.userService.findOneUserById(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const newAccessToken = this.jwtService.sign(
        { id: user.id, email: user.email, role: user.role },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '10m',
        },
      );
      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async organisationRegister(
    createOrganisation: OrganisationRegisterDTO,
  ): Promise<
    Omit<Organisation, ' password'> & {
      access_token: string;
      refresh_token: string;
    }
  > {
    const existingOrganisation = await this.em.findOne(Organisation, {
      $or: [
        { siret: createOrganisation.siret },
        { organisationName: createOrganisation.organisationName },
      ],
    });

    if (existingOrganisation) {
      throw new HttpException(
        'Organisation already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const haschPassword = await bcrypt.hash(createOrganisation.password, 10);
    logger.debug('password', haschPassword);
    const organisation = this.em.create(Organisation, {
      ...createOrganisation,
      password: haschPassword,
      role: UserRole.ADMIN,
      status: Status.PENDING,
      createdAt: new Date().toISOString(),
    });

    await this.em.persistAndFlush(organisation);
    const payload = {
      id: organisation.id,
      email: organisation.email,
      role: organisation.role,
    };
    const secret = this.configService.get('JWT_SECRET');
    const secretRefresh = this.configService.get('JWT_REFRESH_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '2m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: secretRefresh,
      expiresIn: '7d',
    });

    return {
      ...organisation,
      access_token,
      refresh_token,
      role: UserRole.ADMIN,
    };
  }

  async organisationLogin(loginOrganisation: AuthPayloadDto): Promise<
    Omit<Organisation, 'password'> & {
      access_token: string;
      refresh_token: string;
    }
  > {
    const organisation = await this.validateUser(loginOrganisation);
    const payload = {
      id: organisation.id,
      email: organisation.email,
      role: organisation.role,
    };
    const secret = this.configService.get('JWT_SECRET');
    const secretRefresh = this.configService.get('JWT_REFRESH_SECRET');
    const access_token = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn: '2m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: secretRefresh,
      expiresIn: '7d',
    });

    return {
      ...organisation,
      access_token,
      refresh_token,
      role: UserRole.ADMIN,
    } as Omit<Organisation, 'password'> & {
      access_token: string;
      refresh_token: string;
    };
  }

  // async createSuperAdmin(
  //   superAdminRegister: SuperAdminDTO,
  // ): Promise<Omit<SuperAdmin, 'password'> & { access_token: string }> {
  //   const existingSuperAdmin = await this.em.findOne(SuperAdmin, {
  //     username: superAdminRegister.username,
  //   });
  //   if (existingSuperAdmin) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }
  //   //Haschage du mot de passe
  //   const haschPassword = await bcrypt.hash(superAdminRegister.password, 10);
  //   // On créé une instance de l'utilisateur
  //   const superAdmin = this.em.create(SuperAdmin, {
  //     ...superAdminRegister,
  //     password: haschPassword,
  //     createdAt: new Date().toISOString(),
  //   });
  //   // On l'enregistre dans la base de données
  //   await this.em.persistAndFlush(superAdmin);

  //   // On génére un JWT pour l'utilisateur nouvellement créé
  //   const payload = { id: superAdmin.id, email: superAdmin.email };
  //   // On génère le token
  //   const secret = this.configService.get('JWT_SECRET');
  //   const access_token = await this.jwtService.signAsync(payload, {
  //     secret,
  //   });
  //   return {
  //     ...superAdmin,
  //     access_token,
  //   };
  // }

  // async loginSuperAdmin(
  //   superAdminLogin: AuthPayloadDto,
  // ): Promise<Omit<SuperAdmin, 'password'> & { access_token: string }> {
  //   const superAdmin = await this.validateUser(superAdminLogin);
  //   const payload = { id: superAdmin.id, email: superAdmin.email };
  //   const secret = this.configService.get('JWT_SECRET');
  //   const access_token = await this.jwtService.signAsync(payload, {
  //     secret,
  //   });
  //   return {
  //     ...superAdmin,
  //     access_token,
  //   } as Omit<SuperAdmin, 'password'> & { access_token: string };
  // }

  generateResetToken(userId: string): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  async forgotPassword(email: string): Promise<{ token: string }> {
    const user = await this.userService.findOneUserByEmail(email); // Trouver l'utilisateur par email
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Générer le token de réinitialisation
    const token = this.generateResetToken(user.id);

    // On envoyer un email avec le lien de réinitialisation du mot de passe (simulé ici)
    const resetLink = `https://ton-site.com/reset-password?token=${token}`;
    logger.log(`Envoyer ce lien à l'utilisateur : ${resetLink}`);

    //On envoye l'email via Brevo
    // await this.emailService.sendResetPasswordEmail(email, resetLink);

    // Envoi de l'email ici avec le lien de réinitialisation (en développement, on l'affiche seulement)
    // Par exemple, tu peux appeler un service d'email pour envoyer le lien.

    return { token };
  }

  async validateResetToken(token: string): Promise<string> {
    logger.debug('validate', token);
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // On retourne l'id du user
      return decoded.sub;
    } catch (err) {
      throw new BadRequestException(' Invalid Token or expired');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<string> {
    logger.debug('in authservice reset', newPassword, token);
    const userId = await this.validateResetToken(token);
    logger.debug('userid', userId);
    const user = await this.userService.findOneUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //On met à jour le mot de passe dans la base
    user.password = hashedPassword;
    await this.userService.updateUser(user);

    return 'this is a success';
  }
}
