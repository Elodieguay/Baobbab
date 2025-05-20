import { ScheduleDTO } from '@baobbab/dtos';
import { EntityManager, wrap } from '@mikro-orm/core';
import { logger } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Schedule } from 'src/entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(private readonly em: EntityManager) {}
  // create(createScheduleDto: CreateScheduleDto) {
  //   return 'This action adds a new schedule';
  // }

  // findAll() {
  //   return `This action returns all schedule`;
  // }

  async findOne(id: string) {
    const schedule = await this.em.findOne(
      Schedule,
      { id },
      { populate: ['courses'] },
    );
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    return schedule;
  }

  async update(id: string, updateSchedule: ScheduleDTO): Promise<Schedule> {
    if (!id) {
      throw new NotFoundException('Schedule not found');
    }
    const schedule = await this.findOne(id);
    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }
    wrap(schedule).assign({
      day: updateSchedule.day,
      hours: updateSchedule.hours,
    });

    await this.em.persistAndFlush(schedule);

    return schedule;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} schedule`;
  // }
}
