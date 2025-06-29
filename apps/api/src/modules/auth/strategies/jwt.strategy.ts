import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { logger } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { LoginResponse, UserRole } from '@baobbab/dtos';
import { OrganisationService } from 'src/modules/organisation/organisation.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly organisationService: OrganisationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // async validate(payload: LoginResponse): Promise<User | null> {
  //   const user = await this.userService.findOneUserById(payload.id);
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   return user;
  // }

  async validate(payload: any) {
    const { id, role } = payload;

    if (!role) {
      throw new UnauthorizedException('Role not present in token');
    }

    if (role === UserRole.USER) {
      const user = await this.userService.findOneUserById(id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return {
        id: user.id,
        email: user.email,
        role: UserRole.USER,
      };
    }

    if (role === UserRole.ADMIN) {
      const organisation = await this.organisationService.findById(id);
      if (!organisation) {
        throw new UnauthorizedException('Organisation not found');
      }
      return {
        id: organisation.id,
        email: organisation.email,
        role,
      };
    }

    throw new UnauthorizedException('Invalid role');
  }
}
