import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleDTO } from '@baobbab/dtos';
import { logger } from '@mikro-orm/nestjs';
import { error } from 'console';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // @Get()
  // findAll() {
  //   return this.scheduleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.scheduleService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: ScheduleDTO) {
    try {
      const schedule = this.scheduleService.update(id, updateScheduleDto);
      return schedule;
    } catch (error) {
      logger.error('Error to update the schedule');
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.scheduleService.remove(+id);
  // }
}
