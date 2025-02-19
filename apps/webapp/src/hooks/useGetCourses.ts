import { getCourseById, getCourses } from '@/api/courses';
import { useQuery } from '@tanstack/react-query';

import { UseQueryResult } from '@tanstack/react-query';

export const useGetCourses = (coordinates: {
    lat: number;
    lng: number;
}): UseQueryResult<any, unknown> => {
    return useQuery({
        queryKey: ['courses', coordinates],
        queryFn: () => getCourses(),
        staleTime: 5 * 60 * 1000,
        enabled: !!coordinates,
    });
};
export const useGetCourseById = (
    courseId: string
): UseQueryResult<any, unknown> => {
    return useQuery({
        queryKey: ['courseId', courseId],
        queryFn: () => getCourseById(courseId),
    });
};
