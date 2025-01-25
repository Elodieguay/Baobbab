"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organisationFormSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_dto_1 = require("./user.dto");
const phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);
exports.organisationFormSchema = zod_1.default.object({
    firstname: zod_1.default.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    lastname: zod_1.default.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    organisationName: zod_1.default.string().min(2, {
        message: 'Le nom doit contenir au moins 2 caractères.',
    }),
    siret: zod_1.default.number().min(10, {
        message: ' Le siret n/est pas valide',
    }),
    phoneNumber: zod_1.default.string().regex(phoneNumberValidation, {
        message: 'le numéro doit contenir au moins 10 chiffres.',
    }),
    email: zod_1.default.string().email({
        message: "L'adresse email n'est pas valide.",
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
    password: zod_1.default
        .string()
        .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
    })
        .regex(user_dto_1.passwordValidation, {
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
    image: zod_1.default.string().url(),
});
//# sourceMappingURL=organisation.js.map