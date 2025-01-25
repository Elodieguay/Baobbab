import { config } from '@/config';
import { GeocodingFeatureCollection, Point } from '@baobbab/dtos';
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
    // console.log('response api front', response);

    return response;
}

export const getCoordinates = async (city: string): Promise<Point> => {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${city}`;
    const response = (await ky.get(url).json()) as GeocodingFeatureCollection;
    // console.log('response in getCoordinates', response);

    const coordinates = response.features[0].geometry.coordinates;

    return { lat: coordinates[1], lng: coordinates[0] };
};
