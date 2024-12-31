import { config } from '@/config';
import { GeocodingFeatureCollection } from '@baobbab/dtos';
import ky from 'ky';

interface GetAddressesDTO {
    address: string;
    limit: number;
}

export async function geocodingAdresses(
    params: GetAddressesDTO
): Promise<GeocodingFeatureCollection[] | null> {
    const searchParams = {
        address: params.address,
        limit: params.limit,
    };
    const url = `${config.apiUrl}/geocoding?address=${searchParams.address}&limit=${searchParams.limit}`;
    const response = (await ky
        .get(url, {
            json: { address: searchParams.address, limit: searchParams.limit },
        })
        .json()) as GeocodingFeatureCollection[];
    console.log('response api front', response);

    return response;
}
