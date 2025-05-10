import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service';
import * as dotenv from 'dotenv';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailService } from '../email/email.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtAuthGuard,
    JwtStrategy,
    LocalStrategy,
    UserService,
    EmailService,
    UserService,
  ],
  exports: [AuthService, JwtModule, JwtService],
})
export class AuthModule {}