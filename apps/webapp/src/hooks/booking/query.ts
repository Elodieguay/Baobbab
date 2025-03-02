import { createBookingCourse, getBookingCourse } from '@/api/booking';
import { CreateABooking } from '@baobbab/dtos';
import { useMutation, useQuery } from '@tanstack/react-query';
import log from 'loglevel';

export const useCreateABooking = () => {
    return useMutation({
        mutationFn: (createBooking: CreateABooking) =>
            createBookingCourse(createBooking),
        onSuccess: (data) => {
            log.debug('Les modifications sont enregistrées:', data);
        },
        onError: (error) => {
            log.error('Les modifications ont échouées:', error);
        },
    });
};

export const useGetCourseById = () => {
    return useQuery({
        queryKey: ['booking'],
        queryFn: () => getBookingCourse(),
        staleTime: 5 * 60 * 1000,
    });
};
