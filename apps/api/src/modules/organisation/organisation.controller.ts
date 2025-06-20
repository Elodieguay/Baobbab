import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationCompleteInfo, OrganisationInfosDTO } from '@baobbab/dtos';
import { OrganisationInfos } from 'src/entities/organisationInfos.entity';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOrganisationById(
    @Param('id') id: string,
  ): Promise<OrganisationCompleteInfo> {
    return this.organisationService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async createOrganisationInfos(
    @Param('id') id: string,
    @Body() createOrganisationInfos: OrganisationInfos,
  ): Promise<OrganisationInfosDTO> {
    return this.organisationService.create({ id, createOrganisationInfos });
  }
}
