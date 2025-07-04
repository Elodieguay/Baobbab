import { getUser } from '@/api/user';
import { UserProfile } from '@baobbab/dtos';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetUser(options?: Partial<UseQueryOptions<UserProfile>>) {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const data = await getUser();
            return data;
        },
        ...options,
    });
}
