import {
    getCategory,
    getCourseById,
    getCoursesByCategory,
} from '@/api/courses';
import { useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

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
    return useQuery({
        queryKey: ['courseCategory', categoryId],
        queryFn: () => getCoursesByCategory(categoryId),
        enabled: categoryId !== undefined,
        placeholderData: (previous) => previous,
        staleTime: 5 * 60 * 1000,
        initialData: () => {
            const queryClient = useQueryClient();

            const cached = queryClient.getQueryData([
                'courseCategory',
                categoryId,
            ]);
            return cached ?? undefined;
        },
    });
};

export const useGetCategory = () => {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => getCategory(),
    });
};
