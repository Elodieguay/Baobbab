import {
    getCategory,
    getCourseById,
    getCoursesByCategory,
} from '@/api/courses';
import { useQuery } from '@tanstack/react-query';
import log from 'loglevel';

// export const useGetCourses = (coordinates) => {
//     return useQuery({
//         queryKey: ['courses', coordinates],
//         queryFn: () => getCourses(),
//         staleTime: 5 * 60 * 1000,
//         enabled: !!coordinates,
//     });
// };
export const useGetCourseById = (courseId: string) => {
    return useQuery({
        queryKey: ['courseId', courseId],
        queryFn: () => getCourseById(courseId),
        enabled: !!courseId,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGetCourseByCategory = (categoryId: string) => {
    log.debug('category dans query', categoryId);
    return useQuery({
        queryKey: ['courseCategory', categoryId],
        queryFn: () => getCoursesByCategory(categoryId),
        enabled: categoryId !== undefined,
    });
};

export const useGetCategory = () => {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => getCategory(),
    });
};
