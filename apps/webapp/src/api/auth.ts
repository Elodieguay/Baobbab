import {
    OrganisationLoginDTO,
    OrganisationAuthResponse,
    OrganisationRegisterDTO,
    ProtectedRouteDTO,
    RegisterResponse,
    UserLoginDTO,
    UserRegisterDTO,
    LoginResponse,
} from '@baobbab/dtos';
import { config } from '../config';
import ky from 'ky';
import z from 'zod';
import log from 'loglevel';

const registerSchema = z.object({
    username: z.string().min(4).optional(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['USER']),
});

const registerOrganisationSchema = z.object({
    siret: z.string().length(14).regex(/^\d+$/),
    organisationName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export const loginOrganisationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['ADMIN']),
});
// cette fonction permet d'enregistrer un utilisateur

export async function registerUser(
    createUser: UserRegisterDTO
): Promise<RegisterResponse> {
    const validationResult = registerSchema.safeParse(createUser);

    if (!validationResult.success) {
        throw new Error('Validation error: invalid input data');
    }

    try {
        const url = `${config.apiUrl}/auth/register`;

        const response = (await ky
            .post(url, { json: createUser })
            .json()) as RegisterResponse;
        log.debug('response User Register:', response);

        return response;
    } catch (error) {
        log.error('error registering user', error);
        throw error;
    }
}

// la fonction permet de connecter un utilisateur
export async function loginUser(
    loginUser: UserLoginDTO
): Promise<UserLoginDTO> {
    const validationResult = registerSchema.safeParse(loginUser);

    if (!validationResult.success) {
        log.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }

    try {
        const url = `${config.apiUrl}/auth/login`;
        const response = (await ky
            .post(url, { json: loginUser })
            .json()) as LoginResponse;
        log.debug('response User login:', response);

        return response;
    } catch (error) {
        log.error('error logging in user', error);
        throw error;
    }
}

export const checkProtectedRoute = async ({
    token,
    // role,
}: ProtectedRouteDTO): Promise<ProtectedRouteDTO> => {
    try {
        const response = await ky.post('/auth/protected', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    } catch (error) {
        log.error('Check protested route failed:', error);

        throw new Error('User is not authenticated or token is invalid');
    }
};

export async function registerOrganisation(
    createOrganisation: OrganisationRegisterDTO
): Promise<OrganisationAuthResponse> {
    log.debug('payload', createOrganisation);
    const validationResult =
        registerOrganisationSchema.safeParse(createOrganisation);
    if (!validationResult.success) {
        log.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }
    try {
        const url = `${config.apiUrl}/auth/organisationRegister`;
        const response = (await ky
            .post(url, { json: createOrganisation })
            .json()) as OrganisationAuthResponse;
        log.info('response', response);

        return response;
    } catch (error) {
        log.error('error registering organisation', error);
        throw error;
    }
}

export async function loginOrganisation(
    loginOrganisation: OrganisationLoginDTO
): Promise<OrganisationAuthResponse> {
    const validationResult =
        loginOrganisationSchema.safeParse(loginOrganisation);

    if (!validationResult.success) {
        log.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }

    try {
        const url = `${config.apiUrl}/auth/organisationLogin`;
        const response = (await ky
            .post(url, { json: loginOrganisation })
            .json()) as OrganisationAuthResponse;

        return response;
    } catch (error) {
        log.error('error logging in user', error);
        throw error;
    }
}

export async function forgotPassword({
    email,
}: {
    email: string;
}): Promise<string> {
    log.debug('email:', email);
    try {
        const url = `${config.apiUrl}/auth/forgotPassword`;
        const response = await ky.post(url, { json: { email } }).json<string>();
        log.debug(response);
        return response;
    } catch (error) {
        log.error('error sending email', error);
        throw error;
    }
}

export async function resetPassword(
    token: string,
    password: string
): Promise<string> {
    log.debug('token,password', token, password);
    try {
        const url = `${config.apiUrl}/auth/resetPassword`;
        const response = await ky
            .post(url, { json: { token: token, newPassword: password } })
            .json<string>();
        return response;
    } catch (error) {
        log.error('error resetting password', error);
        throw error;
    }
}
