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
      {
        populate: [
          'organisationInfos',
          'courses',
          'courses.schedule',
          'courses.category',
          'courses.booking',
          'courses.booking.user',
        ],
      },
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
    if (organisation.organisationInfos?.image === '') {
      createOrganisationInfos.image =
        'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?_gl=1*14dpdnc*_ga*NTkwNDEzMzY3LjE3NTA1NDk2Mzg.*_ga_8JE65Q40S6*czE3NTA1NTkxNjYkbzIkZzEkdDE3NTA1NTkyODAkajU5JGwwJGgw&w=800&q=75&fm=webp';
    }
    const organisationInfos = this.em.create(
      OrganisationInfos,
      createOrganisationInfos,
    );
    await this.em.persistAndFlush(organisationInfos);
    return organisationInfos;
  }
}
