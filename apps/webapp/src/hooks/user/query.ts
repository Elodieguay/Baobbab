import { getUser } from '@/api/user';
import { UserDTO } from '@baobbab/dtos';
import {
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query';
import { ErrorResponse } from 'react-router';

// export const useGetUser = (token: string) => {
//     if (!token) return null;
//     return useQuery<UserDTO>({
//         queryKey: ['user', token],
//         queryFn: () => getUser(token),
//         enabled: !!token,
//     });
// };

export function useGetUser(token: string) {
    if (!token) {
        throw new Error(' a token is required');
    }
    return useQuery({
        queryKey: ['user', token],
        queryFn: async () => {
            const data = await getUser(token);
            return data;
        },
        enabled: !!token,
    });
}
// export const useGetUser = (token: string) => {
//     if (!token) return null;
//     const{data} = useQuery({
//         queryKey: ['user', token],
//         queryFn: () => getUser(token),
//         enabled: !!token,
//     });
//     return{data}
// };
