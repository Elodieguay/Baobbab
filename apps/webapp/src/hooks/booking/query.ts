import {
    createBookingCourse,
    deleteUserBooking,
    getOrganisationUserBooking,
    getUserBooking,
} from '@/api/booking';
import { CreateABooking } from '@baobbab/dtos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import log from 'loglevel';

export const useCreateABooking = (options?: {
    onSuccess: (data: CreateABooking) => void;
    onError: (error: Error) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            userId,
            createBooking,
        }: {
            userId: string;
            createBooking: CreateABooking;
        }) => {
            if (!userId) {
                throw new Error('un id est requis');
            }
            return createBookingCourse(userId, createBooking);
        },
        onSuccess: (data) => {
            const userbooking = data;
            queryClient.invalidateQueries({
                queryKey: ['booking-userId'],
            });
            options?.onSuccess?.(userbooking);
            log.debug('Les modifications sont enregistrées:', data);
        },
        onError: (error) => {
            log.error('Les modifications ont échouées:', error);
            options?.onError(error as Error);
        },
    });
};

// export const useGetCourseById = () => {
//     return useQuery({
//         queryKey: ['booking'],
//         queryFn: () => getBookingCourse(),
//         staleTime: 5 * 60 * 1000,
//     });
// };

export const useGetUserBooking = (userId: string) => {
    return useQuery({
        queryKey: ['booking'],
        queryFn: () => getUserBooking(userId),
    });
};

export const useGetOrganisationUserBooking = (
    organisationId: string,
    token: string
) => {
    return useQuery({
        queryKey: ['booking'],
        queryFn: () => getOrganisationUserBooking(organisationId, token),
    });
};

export const useDeleteUserBooking = (
    bookingId: string,
    userId?: string,
    options?: {
        onSuccess: () => void;
        onError: (error: Error) => void;
    }
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return deleteUserBooking(bookingId, userId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['booking'],
            });
            options?.onSuccess?.();
        },
        onError: (error) => {
            options?.onError(error as Error);
        },
    });
};
