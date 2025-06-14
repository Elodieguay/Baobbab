import { z } from 'zod';

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const formSchema = z.object({
    username: z.string().min(4, {
        message: 'Le nom doit contenir au moins 4 caractères.',
    }),
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
            message: 'Le mot de passe doit contenir au moins 8 caractères.',
        })
        .regex(passwordValidation, {
            message:
                'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
        }),
});

export const citySchema = z.object({
    city: z.string().min(0, 'Une ville est requise'),
});

export const coursesSchema = z.object({
    name: z.string().min(2, {
        message: 'Le nom doit comporter au moins 2 caractères',
    }),
    details: z.string().min(10, {
        message: 'La description doit contenir au moins 10 caractères',
    }),
    days: z.string().array().nonempty({
        message: 'Au minimum un jour est requis',
    }),
    hours: z.string().array().nonempty({
        message: 'Au minimum un horaire est requis',
    }),
    address: z.string().array().nonempty({
        message: 'Une adresse est requise',
    }),
    reminder: z.string().array().nonempty({
        message: 'Au minimum une recommandation est requise',
    }),
    image: z.instanceof(File, {
        message: 'Une image est requise',
    }),
});
