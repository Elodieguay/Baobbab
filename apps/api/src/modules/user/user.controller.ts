import { UserDTO } from '@baobbab/dtos/src/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get } from '@nestjs/common';
import { UserRole } from '@baobbab/dtos';
import { logger } from '@mikro-orm/nestjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Récuperer un utilisateur par son nom d'utilisateur

  @Get('user')
  async getUserById(@Body('id') id: string): Promise<UserDTO> {
    const user = await this.userService.findOneUserById(id);
    if (!user) {
      logger.error(`User with ${id} not found`);
      throw new Error('User not found');
    }
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
