import z from 'zod';
import { UserRole } from './enum';
export declare const MAX_FILE_SIZE: number;
export declare const ACCEPTED_IMAGE_TYPES: string[];
export declare const organisationFormSchema: z.ZodObject<{
    firstname: z.ZodString;
    lastname: z.ZodString;
    phone: z.ZodString;
    address: z.ZodString;
    bio: z.ZodString;
    website: z.ZodOptional<z.ZodString>;
    socialMediaInstagram: z.ZodOptional<z.ZodString>;
    socialMediaFaceBook: z.ZodOptional<z.ZodString>;
    socialMediaTwitter: z.ZodOptional<z.ZodString>;
    socialMediaTikTok: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address: string;
    firstname: string;
    lastname: string;
    phone: string;
    bio: string;
    website?: string | undefined;
    socialMediaInstagram?: string | undefined;
    socialMediaFaceBook?: string | undefined;
    socialMediaTwitter?: string | undefined;
    socialMediaTikTok?: string | undefined;
}, {
    address: string;
    firstname: string;
    lastname: string;
    phone: string;
    bio: string;
    website?: string | undefined;
    socialMediaInstagram?: string | undefined;
    socialMediaFaceBook?: string | undefined;
    socialMediaTwitter?: string | undefined;
    socialMediaTikTok?: string | undefined;
}>;
export declare const organisationRegisterFormSchema: z.ZodObject<{
    siret: z.ZodString;
    organisationName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    siret: string;
    organisationName: string;
    email: string;
    password: string;
}, {
    siret: string;
    organisationName: string;
    email: string;
    password: string;
}>;
export declare const organisationLoginFormSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
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
}
