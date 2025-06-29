import { getUser } from '@/api/user';
import { UserProfile } from '@baobbab/dtos';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetUser(
    token: string,
    options?: Partial<UseQueryOptions<UserProfile>>
) {
    return useQuery({
        queryKey: ['user', token],
        queryFn: async () => {
            if (!token) {
                throw new Error(' a token is required');
            }
            const data = await getUser(token);
            return data;
        },
        ...options,
    });
}
