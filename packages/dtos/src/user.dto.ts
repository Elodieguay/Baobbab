import { z } from 'zod';
import { EntityType, UserRole } from './enum';

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole.USER;
    access_token: string;
    entityType: EntityType.USER;
    created_at: Date;
}

export interface LoginResponse {
    id: string;
    username: string;
    password: '';
    email: string;
    role: UserRole;
    access_token: string;
    entityType: EntityType.USER;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserDTO {
    id: string;
    username?: string;
    email: string;
    password: string;
    role: UserRole;
    created_at?: Date;
    updated_at?: Date;
}

export interface UserCreateInput {
    username: string;
    password: string;
    email: string;
    role: UserRole.USER;
}

export interface UserRegisterDTO {
    username: string;
    email: string;
    password: string;
    role: UserRole.USER;
     created_at?: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface ProtectedRouteDTO {
    token: string;
    role: UserRole;
}

export const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
export const phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);

export type FormSchemaType = z.infer<typeof formSchema>;
export const formSchema = z.object({
    username: z
        .string()
        .min(4, {
            message: 'Le nom doit contenir au moins 4 caractères.',
        })
        .optional(),
    // phoneNumber: z.string().regex(phoneNumberValidation, {
    //   message: 'le numéro doit contenir au moins 10 chiffres.',
    // }),
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
});

export const formLoginSchema = z.object({
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
});

export type forgottenPasswordSchemaType = z.infer<
    typeof forgottenPasswordSchema
>;

export const forgottenPasswordSchema = z.object({
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
});

export const formLoginSchema = z.object({
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
});
