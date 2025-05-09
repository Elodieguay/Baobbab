import {
    getOrganisationById,
    updateOrganisationInfos,
} from '@/api/organisation';
import { OrganisationInfosDTO } from '@baobbab/dtos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import log from 'loglevel';

export const useOrganisationById = (organisationId: string) => {
    return useQuery({
        queryKey: ['organisationId', organisationId],
        queryFn: () => getOrganisationById(organisationId),
        staleTime: 5 * 1000,
    });
};

export const useUpdateOrganisationInfos = (
    organisationId: string,
    options?: {
        onSuccess?: (data: OrganisationInfosDTO) => void;
        onError?: (error: Error) => void;
    }
) => {
    if (!organisationId) {
        throw new Error('un id organisation est requis');
    }
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            updateOrganisationInfo,
        }: {
            updateOrganisationInfo: OrganisationInfosDTO;
        }) => {
            return updateOrganisationInfos({
                organisationId,
                updateOrganisationInfo,
            });
        },
        onSuccess: (data) => {
            const organisation = data;
            queryClient.invalidateQueries({
                queryKey: ['updateOrganisation'],
            });
            log.info('Les modifications sont enregistrées:', data);
            options?.onSuccess?.(organisation);
        },
        onError: (error) => {
            log.error('Les modifications ont échouées:', error);
            options?.onError?.(error as Error);
        },
    });
};
