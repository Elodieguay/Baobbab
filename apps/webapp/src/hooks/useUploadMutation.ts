import imageUpload, { ImageUploadResponse } from '@/api/imageUpload';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const useUploadMutation = (): UseMutationResult => {
    return useMutation({
        mutationFn: imageUpload, // Fonction qui exécute la requête
        onSuccess: (data: ImageUploadResponse) => {
            console.log('Image upload successful:', data);
        },
        onError: (error) => {
            console.error('Image upload failed:', error);
        },
    });
};
