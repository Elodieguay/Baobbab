import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationInfosDTO, OrganisationRegisterDTO } from '@baobbab/dtos';
import { OrganisationInfos } from 'src/entities/organisationInfos.entity';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOrganisationById(
    @Param('id') id: string,
  ): Promise<Omit<OrganisationRegisterDTO, 'password'>> {
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
