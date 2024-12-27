import { loginUser, registerUser } from '@/api/auth';
import { UserLoginDTO, UserRegisterDTO } from '@baobbab/dtos';
import { useMutation } from '@tanstack/react-query';

/*eslint-disable @typescript-eslint/no-explicit-any*/

import { UseMutationResult } from '@tanstack/react-query';

export const useRegisterMutation = (): UseMutationResult<
    any,
    unknown,
    UserRegisterDTO,
    unknown
> => {
    return useMutation({
        mutationFn: (data: UserRegisterDTO) => registerUser(data),
    });
};

export const useLoginMutation = (): UseMutationResult<
    any,
    unknown,
    UserLoginDTO,
    unknown
> => {
    return useMutation({
        mutationFn: (data: UserLoginDTO) => loginUser(data),
    });
};
