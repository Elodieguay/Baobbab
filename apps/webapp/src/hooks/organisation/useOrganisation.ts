import {
    getOrganisation,
    getOrganisationById,
    updateOrganisationInfos,
} from '@/api/organisation';
import { OrganisationInfosDTO, OrganisationProfile } from '@baobbab/dtos';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import log from 'loglevel';

export function useGetOrganisation(
    token: string,
    options?: Partial<UseQueryOptions<OrganisationProfile>>
) {
    return useQuery({
        queryKey: ['organisation', token],
        queryFn: async () => {
            if (!token) {
                throw new Error(' a token is required');
            }
            const data = await getOrganisation(token);
            return data;
        },
        ...options,
    });
}
export const useOrganisationById = (organisationId: string) => {
    return useQuery({
        queryKey: ['organisationId', organisationId],
        queryFn: () => getOrganisationById(organisationId),
        staleTime: 5 * 1000,
    });
};

export const useUpdateOrganisationInfos = (organisationId: string) => {
    const { toast } = useToast();
    return useMutation({
        mutationFn: ({
            updateOrganisationInfo,
        }: {
            updateOrganisationInfo: OrganisationInfosDTO;
        }) =>
            updateOrganisationInfos({ organisationId, updateOrganisationInfo }),
        onSuccess: (data) => {
            log.info('Les modifications sont enregistrées:', data);

            toast({
                title: 'Les modifications sont enregistrées',
                variant: 'default',
            });
        },
        onError: (error) => {
            log.error('Les modifications ont échouées:', error);
            toast({
                title: 'Les modifications ont échouées',
                variant: 'destructive',
            });
        },
    });
};
