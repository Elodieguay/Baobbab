"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationLoginFormSchema = exports.organisationRegisterFormSchema = exports.organisationFormSchema = exports.ACCEPTED_IMAGE_TYPES = exports.MAX_FILE_SIZE = void 0;
const zod_1 = __importDefault(require("zod"));
const user_dto_1 = require("./user.dto");
const phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);
exports.MAX_FILE_SIZE = 2 * 1024 * 1024;
exports.ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];
exports.organisationFormSchema = zod_1.default.object({
    firstname: zod_1.default.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    lastname: zod_1.default.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    phone: zod_1.default.string().regex(phoneNumberValidation, {
        message: 'le numéro doit contenir au moins 10 chiffres.',
    }),
    address: zod_1.default.string().min(10, {
        message: "l'adresse doit être valide",
    }),
    bio: zod_1.default.string().min(10, {
        message: 'La description doit comporter au moins 10 caractères',
    }),
    website: zod_1.default.string().url({ message: "L'url n'est pas valide" }).optional(),
    socialMediaInstagram: zod_1.default
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    socialMediaFaceBook: zod_1.default
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    socialMediaTwitter: zod_1.default
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
    socialMediaTikTok: zod_1.default
        .string()
        .url({ message: "L'url n'est pas valide" })
        .optional(),
});
exports.organisationRegisterFormSchema = zod_1.default.object({
    siret: zod_1.default
        .string()
        .length(14, 'Le SIRET doit contenir exactement 14 chiffres')
        .regex(/^\d+$/, 'Le SIRET doit contenir uniquement des chiffres'),
    organisationName: zod_1.default.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères',
    }),
    email: zod_1.default.string().email({
        message: "l'email n'est pas valide",
    }),
    password: zod_1.default
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(user_dto_1.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
exports.organisationLoginFormSchema = zod_1.default.object({
    email: zod_1.default.string().email({
        message: "l'email n'est pas valide",
    }),
    password: zod_1.default
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(user_dto_1.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
//# sourceMappingURL=organisation.js.map