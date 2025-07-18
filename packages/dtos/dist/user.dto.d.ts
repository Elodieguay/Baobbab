import { z } from 'zod';
import { EntityType, UserRole } from './enum';
export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole.USER;
    access_token: string;
    refresh_token: string;
    entityType: EntityType.USER;
    created_at: Date;
}
export interface LoginResponse {
    id: string;
    username: string;
    password: '';
    email: string;
    role: UserRole.USER;
    access_token: string;
    refresh_token: string;
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
export interface UserProfile {
    id: string;
    username?: string;
    email: string;
    role: UserRole;
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
    role: UserRole.USER;
}
export interface ProtectedRouteDTO {
    token: string;
    role: UserRole;
}
export declare const passwordValidation: RegExp;
export declare const phoneNumberValidation: RegExp;
export type FormSchemaType = z.infer<typeof formSchema>;
export declare const formSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    username?: string | undefined;
}, {
    email: string;
    password: string;
    username?: string | undefined;
}>;
export type forgottenPasswordSchemaType = z.infer<typeof forgottenPasswordSchema>;
export declare const forgottenPasswordSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const formLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export declare const resetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
}, {
    password: string;
}>;
