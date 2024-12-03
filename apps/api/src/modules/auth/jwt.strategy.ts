import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserService } from "../user/user.service"
// import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor( private readonly userService: UserService)
        {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: "tonSuperSecretKey123"
            })
        }
    async validate(payload:any){
        return {userId: payload.sub, username: payload.username}
    }
}