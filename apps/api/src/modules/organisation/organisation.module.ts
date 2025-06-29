import { Module } from '@nestjs/common';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OrganisationController],
  providers: [JwtAuthGuard, JwtService, OrganisationService],
  exports: [],
})
export class OrganisationModule {}
