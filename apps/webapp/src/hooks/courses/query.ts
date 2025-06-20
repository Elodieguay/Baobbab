import {
    createCourses,
    getCategory,
    getCourseById,
    getCoursesByCategory,
} from '@/api/courses';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
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

export const useCreateCourse = (options?: {
    onSuccess: (data: CoursesDTOGeojson) => void;
    onError: (error: Error) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            createCourse,
        }: {
            createCourse: CoursesDTOGeojson;
        }) => {
            return createCourses(createCourse);
        },
        onSuccess: (data) => {
            const userbooking = data;
            queryClient.invalidateQueries({
                queryKey: ['course', 'organisation'],
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
