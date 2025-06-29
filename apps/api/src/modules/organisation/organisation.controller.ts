import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import {
  OrganisationAuthResponse,
  OrganisationCompleteInfo,
  OrganisationInfosDTO,
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
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findOneOrganisation(
    @Req() req: AuthenticatedRequest,
  ): Promise<OrganisationAuthResponse> {
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
  @HttpCode(HttpStatus.OK)
  async findOrganisationById(
    @Param('id') id: string,
  ): Promise<OrganisationCompleteInfo> {
    return this.organisationService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async createOrganisationInfos(
    @Param('id') id: string,
    @Body() createOrganisationInfos: OrganisationInfos,
  ): Promise<OrganisationInfosDTO> {
    return this.organisationService.patch({ id, createOrganisationInfos });
  }
}
