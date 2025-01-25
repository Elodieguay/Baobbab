"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseFormSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.courseFormSchema = zod_1.default.object({
    name: zod_1.default.string().min(2, {
        message: " Le nom de l'activité doit contenir au moins 2 caractères.",
    }),
    address: zod_1.default.string().min(8, {
        message: "l'adresse doit être valide",
    }),
    details: zod_1.default.string().min(10, {
        message: 'La description doit comporter au moins 10 caractères',
    }),
    hours: zod_1.default.string(),
    days: zod_1.default.string().array().max(1, {
        message: 'Un jour doit être selectionné',
    }),
    reminder: zod_1.default.string().optional(),
    tags: zod_1.default
        .string()
        .array()
        .refine((value) => value.some((tag) => tag), {
        message: 'Une catégorie doit être selectionnée',
    }),
});
//# sourceMappingURL=courses.js.map