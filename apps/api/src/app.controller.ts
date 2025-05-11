import {
  Controller,
  Get,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MikroORM } from '@mikro-orm/core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly orm: MikroORM,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/seed')
  async seed(@Query('token') token: string) {
    if (token !== process.env.SEED_TOKEN) {
      throw new UnauthorizedException('Access refused');
    }

    const seeder = this.orm.getSeeder();
    await seeder.seed();
    return { success: true };
  }
}
