import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthPayloadDto } from './types/auth.types';
import { UserDTO, UserRegisterDTO } from '@baobbab/dtos/src/user.dto';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { logger } from '@mikro-orm/nestjs';
import {
  OrganisationLoginDTO,
  OrganisationRegisterDTO,
  Status,
  SuperAdminDTO,
  UserRole,
} from '@baobbab/dtos';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Un user s'inscrit
  @Post('register')
  async register(
    @Body() createUserInput: UserRegisterDTO,
  ): Promise<UserRegisterDTO> {
    const user = await this.authService.register(createUserInput);
    return {
      ...user,
      username: user.username || '',
      password: '',
      role: UserRole.USER,
      created_at: user.createdAt,
    };
  }

  // Un user se connecte
  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Body() authPayloadDto: AuthPayloadDto,
  ): Promise<Omit<UserDTO, 'password'> & { access_token: string }> {
    const user = this.authService.login(authPayloadDto);
    return user;
  }

  // Endpoint protégé : on verifie si l'utilisateur est authentifié // route auth/protected
  @Post('protected')
  @UseGuards(JwtAuthGuard)
  async protectedEndpoint(@Req() req: Request): Promise<string> {
    if (!req.user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    return 'Vous êtes authentifié !';
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request): unknown {
    console.log('helloopp');

    logger.debug('inside AuthController status', req.user);
    return req.user;
  }

  @Post('organisationRegister')
  async organisationRegister(
    @Body() createOrganisation: OrganisationRegisterDTO,
  ): Promise<OrganisationRegisterDTO> {
    const organisation =
      await this.authService.organisationRegister(createOrganisation);
    console.log('organisation in controller', organisation);

    return {
      ...organisation,
      password: '',
      status: Status.PENDING,
      role: UserRole.ADMIN,
    };
  }

  @Post('organisationLogin')
  @UseGuards(LocalGuard)
  async loginOrganisation(
    @Body() authPayloadDto: AuthPayloadDto,
  ): Promise<
    Omit<OrganisationLoginDTO, 'password'> & { access_token: string }
  > {
    console.log('authPayloadDto', authPayloadDto);

    const organisation =
      await this.authService.organisationLogin(authPayloadDto);

    return {
      ...organisation,
      role: UserRole.ADMIN,
    };
  }

  @Post('superAdminRegister')
  async superAdminRegister(
    @Body() createSuperAdmin: SuperAdminDTO,
  ): Promise<SuperAdminDTO> {
    const superAdmin =
      await this.authService.createSuperAdmin(createSuperAdmin);
    return {
      ...superAdmin,
      password: '',
      role: UserRole.SUPERADMIN,
    };
  }

  @Post('loginSuperAdmin')
  @UseGuards(LocalGuard)
  async loginSuperAdmin(
    @Body() authPayloadDto: AuthPayloadDto,
  ): Promise<Omit<SuperAdminDTO, 'password'> & { access_token: string }> {
    const superAdmin = this.authService.loginSuperAdmin(authPayloadDto);
    return superAdmin;
  }
}
