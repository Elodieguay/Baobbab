import { OrganisationRegisterDTO } from '@baobbab/dtos';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Organisation } from 'src/entities/organisation.entity';

@Injectable()
export class OrganisationService {
  constructor(private readonly em: EntityManager) {}

  async createOrganisation(
    createOrganisation: OrganisationRegisterDTO,
  ): Promise<Organisation> {
    const organisation = new Organisation();
    await this.em.persistAndFlush(organisation);
    return organisation;
  }
}
