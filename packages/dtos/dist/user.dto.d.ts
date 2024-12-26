import { z } from 'zod';
import { UserRole } from './enum';
export interface UserDTO {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}
export interface UserCreateInput {
    username: string;
    password: string;
    email: string;
    role: UserRole;
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
    role: UserRole.USER;
}
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
