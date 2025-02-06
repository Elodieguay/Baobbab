import {
    OrganisationLoginDTO,
    OrganisationRegisterDTO,
    ProtectedRouteDTO,
    RegisterResponse,
    Status,
    UserLoginDTO,
    UserRegisterDTO,
    UserRole,
} from '@baobbab/dtos';
import { config } from '../config';
import ky from 'ky';
import z from 'zod';

const registerSchema = z.object({
    username: z.string().min(4).optional(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['USER']),
});

const registerOrganisationSchema = z.object({
    siret: z.number().min(14),
    organisationName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.nativeEnum(UserRole),
    status: z.nativeEnum(Status),
});

// cette fonction permet d'enregistrer un utilisateur

export async function registerUser(
    createUser: UserRegisterDTO
): Promise<RegisterResponse> {
    console.log('createUser', createUser);

    const validationResult = registerSchema.safeParse(createUser);
    console.log('validationResult', validationResult);

    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }

    try {
        const url = `${config.apiUrl}/auth/register`;
        console.log('url', url);

        const response = (await ky
            .post(url, { json: createUser })
            .json()) as RegisterResponse;
        console.log('response', response);
        return response;
    } catch (error) {
        console.error('error registering user', error);
        throw error;
    }
}

// la fonction permet de connecter un utilisateur
export async function loginUser(
    loginUser: UserLoginDTO
): Promise<RegisterResponse> {
    const validationResult = registerSchema.safeParse(loginUser);
    console.log('validationResult', validationResult);

    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }

    try {
        const url = `${config.apiUrl}/auth/login`;
        const response = (await ky
            .post(url, { json: loginUser })
            .json()) as RegisterResponse;
        console.log('ApiResponseLogin', response);
        return response;
    } catch (error) {
        console.error('error logging in user', error);
        throw error;
    }
}

export const checkProtectedRoute = async ({
    token,
    role,
}: ProtectedRouteDTO): Promise<ProtectedRouteDTO> => {
    try {
        const response = await ky.post('/auth/protected', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return await response.json();
    } catch (error) {
        throw new Error('User is not authenticated or token is invalid');
    }
};

export async function registerOrganisation(
    createOrganisation: OrganisationRegisterDTO
): Promise<OrganisationRegisterDTO> {
    console.log('createOrganisation', createOrganisation);

    const validationResult =
        registerOrganisationSchema.safeParse(createOrganisation);
    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }
    console.log('validation', validationResult);

    try {
        const url = `${config.apiUrl}/auth/organisationRegister`;
        const response = (await ky
            .post(url, { json: createOrganisation })
            .json()) as OrganisationRegisterDTO;
        console.log('response', response);

        return response;
    } catch (error) {
        console.error('error registering organisation', error);
        throw error;
    }
}

export async function loginOrganisation(
    loginOrganisation: OrganisationLoginDTO
): Promise<OrganisationLoginDTO> {
    const validationResult = registerSchema.safeParse(loginOrganisation);
    console.log('validationResult', validationResult);

    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        throw new Error('Validation error: invalid input data');
    }

    try {
        const url = `${config.apiUrl}/auth/organisationLogin`;
        const response = (await ky
            .post(url, { json: loginUser })
            .json()) as OrganisationLoginDTO;
        return response;
    } catch (error) {
        console.error('error logging in user', error);
        throw error;
    }
}
