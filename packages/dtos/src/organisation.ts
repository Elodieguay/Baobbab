import z from 'zod';
import { passwordValidation } from './user.dto';
import { CoursesDTO } from './courses';
import { Status, UserRole } from './enum';

const phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export const organisationFormSchema = z.object({
    firstname: z.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    lastname: z.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    organisationName: z.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    siret: z.number().min(10, {
        message: ' Le siret n/est pas valide',
    }),
    phone: z.string().regex(phoneNumberValidation, {
        message: 'le numéro doit contenir au moins 10 chiffres.',
    }),
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    address: z.string().min(10, {
        message: "l'adresse doit être valide",
    }),
    // ville: z
    //     .string()
    //     .min(2, {
    //         message: "La ville doit être valide"
    //     }),
    bio: z.string().min(10, {
        message: 'La description doit comporter au moins 10 caractères',
    }),
    website: z.string().url({ message: "L'url n'est pas valide" }).optional(),
    socialMediaInstagram: z
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    socialMediaFaceBook: z
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    socialMediaTwitter: z
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    socialMediaTikTok: z
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
    image: z
        .custom<File>((file) => file instanceof File, {
            message: "L'image doit être un fichier valide",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message:
                'Format invalide. Choisissez une image en JPEG, PNG ou WebP.',
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: 'La taille maximale autorisée est de 2 Mo.',
        }),
});

export const organisationRegisterFormSchema = z.object({
    // status: z.nativeEnum(Status),
    // role: z.nativeEnum(UserRole),
    siret: z.number().min(14, {
        message: 'Le siret doit contenir au moijns 14 caractères',
    }),
    organisationName: z.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères',
    }),
    email: z.string().email({
        message: 'l/email n/est pas valide',
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

export interface OrganisationRegisterDTO {
    status: Status;
    role: UserRole.ADMIN;
    siret: number;
    organisationName: string;
    email: string;
    password: string;
}

export interface OrganisationLoginDTO {
    email: string;
    password: string;
    role: UserRole.ADMIN;
}

export interface OrganisationInfosDTO {
    status: Status;
    role: UserRole;
    siret: number;
    firstname: string;
    lastname: string;
    organisationName: string;
    phone: string;
    address: string;
    email: string;
    password: string;
    bio: string;
    website?: string;
    socialMediaInstagram?: string;
    socialMediaFaceBook?: string;
    socialMediaTwitter?: string;
    socialMediaTikTok?: string;
    image: string | File;
    created_at?: Date;
    updated_at?: Date;
}
