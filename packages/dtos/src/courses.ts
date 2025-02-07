import z from 'zod';
import { Point } from './position';

export interface CategoryDTO {
    title: string;
}

export interface CityDTO {
    city: string;
}

// Schéma pour enregistrer les actvités
export const courseFormSchema = z.object({
    name: z.string().min(2, {
        message: " Le nom de l'activité doit contenir au moins 2 caractères.",
    }),
    address: z.string().min(8, {
        message: "l'adresse doit être valide",
    }),
    // ville: z
    //     .string()
    //     .min(2, {
    //         message: "La ville doit être valide"
    //     }),
    details: z.string().min(10, {
        message: 'La description doit comporter au moins 10 caractères',
    }),
    hours: z.string(),
    // .array()
    // .refine(value => value.some(tag => tag ),{
    //     message: "Un jour doit être selectionné"
    // }),
    days: z.string().array().max(1, {
        message: 'Un jour doit être selectionné',
    }),
    reminder: z.string().optional(),
    tags: z
        .string()
        .array()
        .refine((value) => value.some((tag) => tag), {
            message: 'Une catégorie doit être selectionnée',
        }),
});

export interface CoursesDTO {
    title: string;
    address: string;
    city?: string;
    description: string;
    duration: number;
    days: string[];
    hours: string;
    price: number;
    reminder?: string;
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
