import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthPayloadDto } from './types/auth.types';
import {
  LoginResponse,
  RegisterResponse,
  UserRegisterDTO,
} from '@baobbab/dtos';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { logger } from '@mikro-orm/nestjs';
import { UserRole } from '@baobbab/dtos';
import { EntityType } from '@baobbab/dtos';
import { OrganisationLoginDTO, OrganisationRegisterDTO } from '@baobbab/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserInput: UserRegisterDTO,
  ): Promise<Omit<RegisterResponse, 'password'>> {
    const user = await this.authService.register(createUserInput);
    return {
      ...user,
      username: user.username || '',
      role: UserRole.USER,
      entityType: EntityType.USER,
      created_at: user.createdAt,
      access_token: user.access_token,
      refresh_token: user.refresh_token,
    };
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() authPayloadDto: AuthPayloadDto): Promise<
    Omit<LoginResponse, 'password'> & {
      access_token: string;
      refresh_token: string;
    }
  > {
    const user = await this.authService.login(authPayloadDto);
    return {
      ...user,
      username: user.username || '',
      entityType: EntityType.USER,
      access_token: user.access_token,
      refresh_token: user.refresh_token,
    };
  }

  @Post('refreshToken')
  async refreshToken(
    @Body() { refreshTokenValue }: { refreshTokenValue: string },
  ): Promise<{ access_token: string }> {
    if (!refreshTokenValue) {
      throw new BadRequestException('Refresh token is required');
    }
    const accessToken = await this.authService.refreshToken(refreshTokenValue);
    return { access_token: accessToken };
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
    logger.debug('inside AuthController status', req.user);
    return req.user;
  }

  @Post('organisationRegister')
  async organisationRegister(
    @Body() createOrganisation: OrganisationRegisterDTO,
  ): Promise<Omit<OrganisationRegisterDTO, 'password'>> {
    const organisation =
      await this.authService.organisationRegister(createOrganisation);
    return organisation;
  }

  @Post('organisationLogin')
  @UseGuards(LocalGuard)
  async loginOrganisation(
    @Body() authPayloadDto: AuthPayloadDto,
  ): Promise<
    Omit<OrganisationLoginDTO, 'password'> & { access_token: string }
  > {
    const organisation =
      await this.authService.organisationLogin(authPayloadDto);

    return {
      ...organisation,
      role: UserRole.ADMIN,
    };
  }

  // @Post('superAdminRegister')
  // async superAdminRegister(
  //   @Body() createSuperAdmin: SuperAdminDTO,
  // ): Promise<SuperAdminDTO> {
  //   const superAdmin =
  //     await this.authService.createSuperAdmin(createSuperAdmin);
  //   return {
  //     ...superAdmin,
  //     password: '',
  //     role: UserRole.SUPERADMIN,
  //   };
  // }

  @Post('loginSuperAdmin')
  // @UseGuards(LocalGuard)
  // async loginSuperAdmin(
  //   @Body() authPayloadDto: AuthPayloadDto,
  // ): Promise<Omit<SuperAdminDTO, 'password'> & { access_token: string }> {
  //   const superAdmin = this.authService.loginSuperAdmin(authPayloadDto);
  //   return superAdmin;
  // }

  // Route pour demander un email de réinitialisation de mot de passe
  @Post('forgotPassword')
  async forgotPassword(
    @Body('email') email: string,
  ): Promise<{ token: string }> {
    const result = await this.authService.forgotPassword(email);
    return result;
  }

  @Post('resetPassword')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ message: string }> {
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required');
    }
    const result = await this.authService.resetPassword(token, newPassword);
    return { message: result };
  }
}
