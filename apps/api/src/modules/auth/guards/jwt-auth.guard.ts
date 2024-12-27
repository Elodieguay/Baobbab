import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthorized = (await super.canActivate(context)) as boolean;
    if (!isAuthorized) {
      return false;
    }

    // On récupère le contexte de l'exécution
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('you are not authorized');
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('invalid authorization header format');
    }
    try {
      // On vérifie si le token est valide
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('decoded:', decoded);

      request.user = decoded;
      console.log('request.user:', request.user);

      return true;
    } catch (error) {
      throw new UnauthorizedException('invalid or expired token ');
    }
  }
}
