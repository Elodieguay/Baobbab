import z from 'zod';
export const courseFormSchema = z.object({
    name: z.string().min(2, {
        message: " Le nom de l'activité doit contenir au moins 2 caractères.",
    }),
    address: z.string().min(8, {
        message: "l'adresse doit être valide",
    }),
    details: z.string().min(10, {
        message: 'La description doit comporter au moins 10 caractères',
    }),
    hours: z.string(),
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
//# sourceMappingURL=courses.js.map