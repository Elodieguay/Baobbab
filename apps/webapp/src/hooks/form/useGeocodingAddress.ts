import { geocodingAdresses } from '@/api/geocoding';
import { GeocodingFeatureCollection, GetAddressesDTO } from '@baobbab/dtos';
import { useQuery } from '@tanstack/react-query';

import { UseQueryResult } from '@tanstack/react-query';

export const useGeocodingAddress = (
    params: GetAddressesDTO
): UseQueryResult<GeocodingFeatureCollection[] | null, Error> => {
    return useQuery({
        queryKey: ['geocoding', params],
        queryFn: () => geocodingAdresses(params),
    });
};
