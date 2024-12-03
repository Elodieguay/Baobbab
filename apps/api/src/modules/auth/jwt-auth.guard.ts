import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService
    ){}
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const { headers} =ctx.getContext().req;

        const authHeader = headers.authorization;
        if(!authHeader) return false

        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            ctx.getContext().user = decoded;
            return true;
        } catch (error) {
            return false;
        }
    }
    
}