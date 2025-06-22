import z from 'zod';
import { passwordValidation } from './user.dto';
import { CoursesDTO, CoursesDTOGeojson } from './courses';
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
    phone: z.string().regex(phoneNumberValidation, {
        message: 'le numéro doit contenir au moins 10 chiffres.',
    }),
    address: z.string().min(10, {
        message: "l'adresse doit être valide",
    }),
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
    // image: z
    //     .custom<File>((file) => file instanceof File, {
    //         message: "L'image doit être un fichier valide",
    //     })
    //     .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    //         message:
    //             'Format invalide. Choisissez une image en JPEG, PNG ou WebP.',
    //     })
    //     .refine((file) => file.size <= MAX_FILE_SIZE, {
    //         message: 'La taille maximale autorisée est de 2 Mo.',
    //     }),
});

export const organisationRegisterFormSchema = z.object({
    siret: z
        .string()
        .length(14, 'Le SIRET doit contenir exactement 14 chiffres')
        .regex(/^\d+$/, 'Le SIRET doit contenir uniquement des chiffres'),
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

export const organisationLoginFormSchema = z.object({
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
    siret: string;
    organisationName: string;
    email: string;
    password: string;
}

export interface OrganisationLoginDTO {
    email: string;
    password: string;
    role: UserRole.ADMIN;
}

export interface OrganisationAuthResponse {
    id: string;
    organisationName: string;
    email: string;
    role: UserRole.ADMIN;
    access_token: string;
}

export interface OrganisationInfosDTO {
    firstname: string;
    lastname: string;
    phone: string;
    address: string;
    bio: string;
    website?: string;
    socialMediaInstagram?: string;
    socialMediaFaceBook?: string;
    socialMediaTwitter?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrganisationCompleteInfo extends OrganisationInfosDTO {
    id: string;
    organisationName: string;
    email: string;
    courses: CoursesDTOGeojson[];
}
