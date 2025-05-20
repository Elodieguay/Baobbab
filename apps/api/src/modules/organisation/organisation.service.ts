import {
  OrganisationCompleteInfo,
  OrganisationInfosDTO,
  OrganisationRegisterDTO,
} from '@baobbab/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Organisation } from 'src/entities/organisation.entity';
import { OrganisationInfos } from 'src/entities/organisationInfos.entity';
import { organisationToDto } from './organisation.entityToDTO';

@Injectable()
export class OrganisationService {
  constructor(private readonly em: EntityManager) {}

  async findById(id: string): Promise<OrganisationCompleteInfo> {
    const organisation = await this.em.findOne(
      Organisation,
      { id },
      { populate: ['organisationInfos'] },
    );
    if (!organisation) {
      Logger.error(`Organisation with Id ${id} does not exist`);
      throw new Error(`Organisation with Id ${id} does not exist`);
    }

    return organisationToDto(organisation);
  }

  async create({
    id,
    createOrganisationInfos,
  }: {
    id: string;
    createOrganisationInfos: OrganisationInfos;
  }): Promise<OrganisationInfos> {
    const organisation = await this.em.findOne(Organisation, { id });
    if (!organisation) {
      Logger.error(`Organisation with Id ${id} does not exist`);
      throw new NotFoundException(`Organisation with Id ${id} does not exist`);
    }
    const organisationInfos = this.em.create(
      OrganisationInfos,
      createOrganisationInfos,
    );
    await this.em.persistAndFlush(organisationInfos);
    return organisationInfos;
  }
}
