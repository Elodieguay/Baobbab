import imageUpload, { ImageUploadResponse } from '@/api/imageUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import log from 'loglevel';

export const useUploadMutation = (
    organisationId: string,
    options?: {
        onSuccess?: () => void;
        onError?: () => void;
    }
) => {
    if (!organisationId) {
        throw new Error('un id organisation est requis');
    }
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            imageUploadParams,
        }: {
            imageUploadParams: File;
        }) => {
            log.info('useUpload', imageUploadParams);
            return imageUpload(organisationId, { data: imageUploadParams });
        },
        onSuccess: (data?: ImageUploadResponse) => {
            queryClient.invalidateQueries({
                queryKey: ['uploadImage'],
            });
            options?.onSuccess?.();
            log.info('Image upload successful:', data);
        },
        onError: (error) => {
            log.error('Les modifications ont échouées:', error);
            options?.onError?.();
        },
    });
};
