import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserCreateInput } from '../user/inputs/user-create.input';
import { AuthPayloadDto, LoginResponse } from './types/auth.types';
import { UserDTO, UserRegisterDTO } from '@baobbab/dtos/src/user.dto';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { logger } from '@mikro-orm/nestjs';
import { UserRole } from '@baobbab/dtos';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Un user s'inscrit
  @Post('register')
  async register(@Body() createUserInput: UserRegisterDTO): Promise<UserRegisterDTO> {
    console.log('ici');
    const user = await this.authService.register(createUserInput);
    console.log('user du register du resolver', user);

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
    @Body() authPayloadDto: AuthPayloadDto
  ): Promise<LoginResponse> {   
    console.log('authPayloadDto', authPayloadDto);
    
    const user = this.authService.login(authPayloadDto);
    logger.debug('inside AuthController login', user);
    return user

  }

  // Endpoint protégé : on verifie si l'utilisateur est authentifié // route auth/protected
  @Post('protected')
  @UseGuards(JwtAuthGuard)
  async protectedEndpoint(): Promise<string> {
    return 'Vous êtes authentifié !';
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('helloopp');
    
    logger.debug('inside AuthController status', req.user);
    return req.user

  }
}
