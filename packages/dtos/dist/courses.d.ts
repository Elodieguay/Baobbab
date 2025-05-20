import z from 'zod';
import { CreateABooking } from './booking';
import { Point } from './position';
export interface CategoryDTO {
    id: string;
    title: string;
}
export interface ScheduleDTO {
    id: string;
    day: string;
    hours: string;
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
    address: string;
    name: string;
    details: string;
    hours: string;
    days: string[];
    tags: string[];
    reminder?: string | undefined;
}, {
    address: string;
    name: string;
    details: string;
    hours: string;
    days: string[];
    tags: string[];
    reminder?: string | undefined;
}>;
export interface CoursesDTO {
    id: string;
    title: string;
    address: string;
    city: string | null;
    description: string;
    duration: number;
    schedule: ScheduleDTO[];
    price: number;
    reminder: string | null;
    category: CategoryDTO;
    image: string;
    position: Point;
    organisationId: string;
    booking: CreateABooking[];
}
export interface CourseRegisterDTO {
    name: string;
    address: string;
    details: string;
    schedule: ScheduleDTO;
    reminder?: string;
    tags: string[];
}
export interface CoursesDTOGeojson {
    id: string;
    title: string;
    address: string;
    city: string | null;
    description: string;
    duration: number;
    schedule: ScheduleDTO[];
    price: number;
    reminder: string | null;
    category: CategoryDTO;
    image: string;
    position: {
        type: 'Point';
        coordinates: [number, number];
    };
    organisationId: string;
    booking: CreateABooking[];
}
export interface UpdateCoursesDTOGeojson {
    id: string;
    title: string;
    address: string;
    city: string | null;
    description: string;
    duration: number;
    schedule: ScheduleDTO[];
    price: number;
    reminder: string | null;
    category: CategoryDTO;
    image: string;
    position: {
        type: 'Point';
        coordinates: [number, number];
    };
    organisationId: string;
    booking: CreateABooking[];
}
