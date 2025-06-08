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
        onSuccess: (data, variables) => {
            const userbooking = data;
            queryClient.invalidateQueries({
                queryKey: ['booking', 'user', variables.userId],
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
                queryKey: ['booking', 'user', userId],
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
            userId,
            updateBooking,
        }: {
            bookingId?: string;
            userId: string;
            updateBooking: CreateABooking;
        }) => {
            if (!userId) {
                throw new Error('an id is required');
            }
            if (!bookingId) {
                throw new Error('an bookingId is required');
            }
            return updateUserBooking(bookingId, userId, updateBooking);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['booking', 'user', variables.userId],
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
