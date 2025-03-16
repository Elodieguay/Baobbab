import { GeocodingFeatureCollection, Point } from '@baobbab/dtos';
import ky from 'ky';
import log from 'loglevel';

interface GetAddressesDTO {
    address: string;
    limit: number;
}

export async function geocodingAdresses(
    params: GetAddressesDTO
): Promise<GeocodingFeatureCollection | null> {
    const searchParams = new URLSearchParams({
        q: params.address,
        limit: params.limit.toString(),
    });

    const url = `https://api-adresse.data.gouv.fr/search/?${searchParams.toString()}&lat=42.218371&lon=-1.553621`;
    const response = await ky.get(url).json<GeocodingFeatureCollection>();

    log.debug('response api front', response);

    return response;
}

export const getCoordinates = async (city?: string): Promise<Point> => {
    const url = `https://api-adresse.data.gouv.fr/search/?q=${city}`;
    const response = (await ky.get(url).json()) as GeocodingFeatureCollection;
    // console.log('response in getCoordinates', response);

    const coordinates = response.features[0].geometry.coordinates;

    return { lat: coordinates[1], lng: coordinates[0] };
};
