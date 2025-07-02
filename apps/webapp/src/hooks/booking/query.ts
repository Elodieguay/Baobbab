import {
    createBookingCourse,
    deleteUserBooking,
    getBookingCourse,
    getOrganisationUserBooking,
    getUserBooking,
    updateUserBooking,
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
            createBooking,
        }: {
            createBooking: CreateABooking;
        }) => {
            log.debug('createBooking:', createBooking);
            return createBookingCourse(createBooking);
        },
        onSuccess: (data) => {
            const userbooking = data;
            queryClient.invalidateQueries({
                queryKey: ['booking', 'user'],
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

export const useGetBookingById = (bookingId: string) => {
    return useQuery({
        queryKey: ['booking', 'by-id', bookingId],
        queryFn: () => getBookingCourse(bookingId),
        staleTime: 0,
    });
};

export const useGetUserBooking = (userId: string) => {
    return useQuery({
        queryKey: ['booking', 'user', userId],
        queryFn: () => getUserBooking(userId),
    });
};

export const useGetOrganisationUserBooking = (
    organisationId: string,
    token: string
) => {
    return useQuery({
        queryKey: ['booking', 'organisation', organisationId],
        queryFn: () => getOrganisationUserBooking(organisationId, token),
    });
};

export const useDeleteUserBooking = (
    bookingId: string,
    options?: {
        onSuccess: () => void;
        onError: (error: Error) => void;
    }
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return deleteUserBooking(bookingId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['booking', 'user'],
            });
            options?.onSuccess?.();
        },
        onError: (error) => {
            options?.onError(error as Error);
        },
    });
};

export const useUpdateUserBooking = (options?: {
    onSuccess: () => void;
    onError: (error: Error) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            bookingId,
            updateBooking,
        }: {
            bookingId?: string;
            updateBooking: CreateABooking;
        }) => {
            if (!bookingId) {
                throw new Error('an bookingId is required');
            }
            return updateUserBooking(bookingId, updateBooking);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['booking', 'user'],
            });
            queryClient.invalidateQueries({
                queryKey: ['booking', 'by-id', variables.bookingId],
            });

            options?.onSuccess?.();
        },
        onError: (error) => {
            options?.onError(error as Error);
        },
    });
};
