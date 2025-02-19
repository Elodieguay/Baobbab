import {
    loginOrganisation,
    loginUser,
    registerOrganisation,
    registerUser,
} from '@/api/auth';
import { useAuth } from '@/context/Auth.context';
import {
    OrganisationAuthResponse,
    UserLoginDTO,
    UserRegisterDTO,
    UserRole,
} from '@baobbab/dtos';
import { useMutation } from '@tanstack/react-query';

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
    const { setAuthToken } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: registerOrganisation,
        onSuccess: (data: OrganisationAuthResponse) => {
            log.debug(data.id);
            if (setAuthToken && UserRole.ADMIN && data.id) {
                sessionStorage.setItem('organisationId', data.id);
                navigate(`/dashboard/${data.id}`);
            }
            log.info('The creation of the organisation is successful:', data);
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
