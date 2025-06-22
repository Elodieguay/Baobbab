import imageUpload from '@/api/imageUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
            return imageUpload(organisationId, { data: imageUploadParams });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['uploadImage'],
            });
            options?.onSuccess?.();
        },
        onError: () => {
            options?.onError?.();
        },
    });
};
