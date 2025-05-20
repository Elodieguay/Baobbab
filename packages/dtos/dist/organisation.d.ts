import z from 'zod';
import { Status, UserRole } from './enum';
export declare const MAX_FILE_SIZE: number;
export declare const ACCEPTED_IMAGE_TYPES: string[];
export declare const organisationFormSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    organisationName: z.ZodString;
    siret: z.ZodNumber;
    phone: z.ZodString;
    email: z.ZodString;
    address: z.ZodString;
    bio: z.ZodString;
    website: z.ZodOptional<z.ZodString>;
    socialMediaInstagram: z.ZodOptional<z.ZodString>;
    socialMediaFaceBook: z.ZodOptional<z.ZodString>;
    socialMediaTwitter: z.ZodOptional<z.ZodString>;
    socialMediaTikTok: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    image: z.ZodEffects<z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>, File, File>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    organisationName: string;
    siret: number;
    phone: string;
    address: string;
    bio: string;
    image: File;
    website?: string | undefined;
    socialMediaInstagram?: string | undefined;
    socialMediaFaceBook?: string | undefined;
    socialMediaTwitter?: string | undefined;
    socialMediaTikTok?: string | undefined;
}, {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    organisationName: string;
    siret: number;
    phone: string;
    address: string;
    bio: string;
    image: File;
    website?: string | undefined;
    socialMediaInstagram?: string | undefined;
    socialMediaFaceBook?: string | undefined;
    socialMediaTwitter?: string | undefined;
    socialMediaTikTok?: string | undefined;
}>;
export declare const organisationRegisterFormSchema: z.ZodObject<{
    siret: z.ZodNumber;
    organisationName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    organisationName: string;
    siret: number;
}, {
    email: string;
    password: string;
    organisationName: string;
    siret: number;
}>;
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
