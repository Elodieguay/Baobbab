import {
    forgotPassword,
    loginOrganisation,
    loginUser,
    registerOrganisation,
    registerUser,
    resetPassword,
} from '@/api/auth';
import { useAuth } from '@/context/Auth.context';
import {
    OrganisationAuthResponse,
    UserLoginDTO,
    UserRegisterDTO,
    UserRole,
} from '@baobbab/dtos';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/*eslint-disable @typescript-eslint/no-explicit-any*/

import { UseMutationResult } from '@tanstack/react-query';
import log from 'loglevel';
import { useNavigate } from 'react-router';

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

export const useOrganisationRegister = (): any => {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerOrganisation,
        onSuccess: (data: OrganisationAuthResponse) => {
            log.debug('je suis là');
            log.debug(data);
            if (setAuthData) {
                setAuthData(
                    data.access_token,
                    data.role,
                    'organisation',
                    data.organisationName,
                    data.email
                );
                sessionStorage.setItem('organisationId', data.id);
                navigate(`/dashboard/${data.id}`);
            } else {
                log.error('setAuthData is not defined');
            }
        },
        onError: (error) => {
            log.error('The creation is failed:', error);
        },
    });
};

export const useOrganisationLogin = (): any => {
    const { setAuthToken } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginOrganisation,
        onSuccess: (data: OrganisationAuthResponse) => {
            const { access_token, role, id } = data;
            if ((access_token && role === UserRole.ADMIN, data.id)) {
                if (setAuthToken && UserRole.ADMIN && data.id) {
                    sessionStorage.setItem('organisationId', id);
                    navigate(`/dashboard/${data.id}`);
                }
            }
            log.info('The login is a success', data);
        },
        onError: (error) => {
            log.error('The login failed', error);
        },
    });
};

export const useForgotPassword = (): any => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email }: { email: string }) => forgotPassword({ email }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['forgotPassword'],
            });
        },
        onError: (error) => {
            if (error instanceof Error) {
                error = { name: error.name, message: error.message };
            } else log.error('The useForgotPassword is failed:', error);
        },
    });
};

export const useResetPassword = (token: string): any => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ password }: { password: string }) =>
            resetPassword(token, password),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['resetPassword'],
            });
        },
        onError: (error) => {
            if (error instanceof Error) {
                error = { name: error.name, message: error.message };
            } else log.error('The useResetPassword is failed:', error);
        },
    });
};
