import { z } from 'zod';
import { UserRole } from './enum';
export interface RegisterResponse {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    created_at: Date;
    access_token: string;
}
export interface LoginResponse {
    username: string;
    email: string;
    role: UserRole;
    access_token: string;
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
    created_at: Date;
}
export interface UserLoginDTO {
    email: string;
    password: string;
    role: UserRole;
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
