import { GeocodingFeatureCollection } from '@baobbab/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeocodingService {
  async getGeocodingAddresses(
    address: string,
    limit: number,
  ): Promise<GeocodingFeatureCollection[] | null> {
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${address}&limit=${limit}`,
      );
      if (!response) {
        throw new Error('Error fetchinggeocoding addresses');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching geocoding addresses');
      return null;
    }
  }
}
