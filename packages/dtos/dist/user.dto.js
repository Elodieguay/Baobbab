"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgottenPasswordSchema = exports.formLoginSchema = exports.formSchema = exports.phoneNumberValidation = exports.passwordValidation = void 0;
const zod_1 = require("zod");
exports.passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
exports.phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);
exports.formSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(4, {
        message: 'Le nom doit contenir au moins 4 caractères.',
    })
        .optional(),
    email: zod_1.z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: zod_1.z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(exports.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
exports.formLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: zod_1.z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(exports.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
exports.forgottenPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: zod_1.z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(exports.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
exports.formLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "L'adresse email n'est pas valide.",
    }),
    password: zod_1.z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(exports.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(exports.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
//# sourceMappingURL=user.dto.js.map