import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import authConfig from '../auth.config';
import { AuthService } from '../auth.service';
import { AuthPayloadDto } from '../types/auth.types';
import { logger } from '@mikro-orm/nestjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });

    
  }
  async validate(payload: AuthPayloadDto) {
    console.log('ici jwtstrategy');
    console.log('payload:', payload);
    logger.debug('inside jwtstrategy')
    return payload;
  }
}
// constructor(
//     @Inject(authConfig.KEY)
//     private readonly authService: AuthService,
//     private readonly authentificateConfig: ConfigType<typeof authConfig>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: authentificateConfig.jwtSecret,
//     });
//     console.log('JwtStrategy config:', authentificateConfig);

//   }