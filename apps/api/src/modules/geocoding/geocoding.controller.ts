import { Controller, Get } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';
import { GeocodingFeatureCollection } from 'src/dtos/position';

@Controller('geocoding')
export class GeocodingController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get()
  async getAdresses(
    address: string,
    limit: number,
  ): Promise<GeocodingFeatureCollection[] | null> {
    const result = await this.geocodingService.getGeocodingAddresses(
      address,
      limit,
    );
    return result;
  }
}
