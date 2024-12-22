import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import * as dotenv from "dotenv";
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET,
        signOptions: { 
          expiresIn: process.env.JWT_EXPIRE_IN 
        },
      // })

    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
