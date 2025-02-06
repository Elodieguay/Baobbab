import z from 'zod';
import { Point } from './position';
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
    reminder: string | null;
}>;
export interface CoursesDTO {
    title: string;
    address: string;
    city: string | null;
    description: string;
    duration: number;
    days: string[];
    hours: string;
    price: number;
    reminder: string | null;
    category: CategoryDTO;
    image: string;
    position: Point;
    organisationId: string;
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
