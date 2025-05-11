import { logger } from '@mikro-orm/nestjs';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
    logger.log(
      'JwtService Injected jwt in JwtAuthGuard:',
      JSON.stringify(this.jwtService, null, 2),
    ); // Vérifiez l'injection
  }

  // onModuleInit() {
  //   // Assurez-vous que le service est bien initialisé
  //   logger.log('JwtService Injected jwt moduleinit AuthGuard:', JSON.stringify(this.jwtService, null, 2));
  //   if (!this.jwtService) {
  //     logger.warn('JwtService in AuthGuard is undefined during initialization!');
  //   } else {
  //     logger.log('JwtService inAuthGuard Injected jwt:', this.jwtService);
  //   }
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthorized = (await super.canActivate(context)) as boolean;
    if (!isAuthorized) {
      return false;
    }
    logger.log(
      'JwtService Injected jwt AuthGuard:',
      JSON.stringify(this.jwtService, null, 2),
    );

    // On récupère le contexte de l'exécution
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    logger.debug(authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('you are not authorized');
    }
    const token = authHeader.split(' ')[1];

    logger.debug(token);
    if (!token) {
      throw new UnauthorizedException('invalid authorization header format');
    }
    logger.debug(
      'decoded',
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }),
    );
    // logger.log('JWT secret', process.env.JWT_SECRET);
    try {
      // On vérifie si le token est valide
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      logger.debug(
        'decoded',
        this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        }),
      );
      request.user = decoded;
      return true;
    } catch (error) {
      logger.debug(error);
      throw new UnauthorizedException('invalid or expired token ');
    }
  }
}
