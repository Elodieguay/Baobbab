import z from 'zod';
export interface CategoryDTO {
    title: string;
}
export interface CityDTO {
    city: string;
}
export declare const courseFormSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    details: z.ZodString;
    hours: z.ZodString;
    days: z.ZodArray<z.ZodString, "many">;
    reminder: z.ZodOptional<z.ZodString>;
    tags: z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    address: string;
    details: string;
    hours: string;
    days: string[];
    tags: string[];
    reminder?: string | undefined;
}, {
    name: string;
    address: string;
    details: string;
    hours: string;
    days: string[];
    tags: string[];
    reminder?: string | undefined;
}>;
export interface CoursesDTO {
    name: string;
    address: string;
    details: string;
    days: string;
    hours: string[];
    reminder: string;
    tags: CategoryDTO;
}
export interface CourseRegisterDTO {
    name: string;
    address: string;
    details: string;
    days: string[];
    hours: string;
    reminder?: string;
    tags: string[];
}
