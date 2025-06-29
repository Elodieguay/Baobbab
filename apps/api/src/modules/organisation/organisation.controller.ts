import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import {
  OrganisationCompleteInfo,
  OrganisationInfosDTO,
  OrganisationProfile,
  UserRole,
} from '@baobbab/dtos';
import { OrganisationInfos } from 'src/entities/organisationInfos.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: UserRole };
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get()
  async findOneOrganisation(
    @Req() req: AuthenticatedRequest,
  ): Promise<OrganisationProfile> {
    const orgId = req.user?.id;
    if (!orgId) {
      throw new UnauthorizedException('Organisation ID not found in token');
    }

    const organisation =
      await this.organisationService.findOneOrganisation(orgId);
    if (!organisation?.id) {
      throw new UnauthorizedException('Organisation ID is missing');
    }
    return {
      ...organisation,
      id: organisation.id,
      organisationName: organisation.organisationName,
      email: organisation.email,
      role: UserRole.ADMIN,
      access_token: req.headers.authorization?.replace('Bearer ', '') || '',
    };
  }

  @Get(':id')
  async findOrganisationById(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ): Promise<OrganisationCompleteInfo> {
    const orgId = req.user?.id;
    if (!orgId) {
      throw new UnauthorizedException('Organisation ID not found in token');
    }
    if (orgId !== id) {
      throw new UnauthorizedException(
        'You are not authorized to access this organisation',
      );
    }
    return this.organisationService.findById(id);
  }

  @Patch(':id')
  async createOrganisationInfos(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() createOrganisationInfos: OrganisationInfos,
  ): Promise<OrganisationInfosDTO> {
    const orgId = req.user?.id;
    if (!orgId) {
      throw new UnauthorizedException('Organisation ID not found in token');
    }
    if (orgId !== id) {
      throw new UnauthorizedException(
        'You are not authorized to update this organisation',
      );
    }
    return this.organisationService.patch({ id, createOrganisationInfos });
  }
}
