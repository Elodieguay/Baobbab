import { logger } from "@mikro-orm/nestjs";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { log } from "console";
import { Observable } from "rxjs";

@Injectable()
export class LocalGuard extends AuthGuard('local') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> |Observable<boolean> {        
        logger.debug('inside LocalGuard');
        
        return super.canActivate(context);
    }
}