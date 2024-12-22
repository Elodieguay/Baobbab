import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.resolver';

@Module({
  providers: [UserService, UserController],
})
export class UserModule {}
