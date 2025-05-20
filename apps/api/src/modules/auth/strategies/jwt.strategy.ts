import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { logger } from '@mikro-orm/nestjs';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { LoginResponse } from '@baobbab/dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  // async validate(payload: AuthPayloadDto): Promise<AuthPayloadDto> {
  //   logger.debug("payload", payload)
  //   return payload;
  // }
  async validate(payload: LoginResponse): Promise<User | null> {
    logger.debug('payload', payload);
    const user = await this.userService.findOneUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    logger.log('uservalidate', JSON.stringify(user, null, 2));

    return user;
  }
}
