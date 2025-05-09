import { z } from 'zod';
export const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
export const phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);
export const formSchema = z.object({
    username: z
        .string()
        .min(4, {
        message: 'Le nom doit contenir au moins 4 caractères.',
    })
        .optional(),
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
export const formLoginSchema = z.object({
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
export const forgottenPasswordSchema = z.object({
    email: z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
});
export const resetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
//# sourceMappingURL=user.dto.js.map