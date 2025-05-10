import { UserDTO } from '@baobbab/dtos';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@baobbab/dtos';
import { logger } from '@mikro-orm/nestjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

interface UserRequest extends Request {
  user?: { id: string; email: string };
}
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  onModuleInit() {
    if (!this.jwtService) {
      logger.warn(
        'JwtService in AuthGuard is undefined during initialization!',
      );
    } else {
      logger.log('JwtService inAuthGuard Injected jwt:', this.jwtService);
    }
  }
  //Récuperer un utilisateur par son nom d'utilisateur
  @Get()
  async getUserById(@Req() req: UserRequest): Promise<UserDTO> {
    logger.log('req.user:', JSON.stringify(req.user, null, 2));

    const userId = req?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User ID not found');
    }
    const user = await this.userService.findOneUserById(userId);
    if (!user) {
      logger.error(`User with ${userId} not found`);
      throw new NotFoundException('User not found');
    }
    logger.log('user', user);
    return {
      ...user,
      username: user.username || '',
      password: '',
      role: UserRole.USER,
      created_at: user.createdAt,
      updated_at: user.updatedAt || new Date(),
    };
  }


    // @Get('users')
    // async getAllUsers(): Promise<Omit<UserDTO, 'password'>[]>{
    //     const users = await this.userService.findAllUsers();
    //     console.log('users', users);
    //     return users.map(({id, username, email, role, createdAt, updatedAt}) => ({id, username, email, role, created_at: createdAt, updated_at: updatedAt}))
    // }

    

    
    
}