
import { z } from 'zod';
import { UserRole } from './enum';

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}


export interface UserCreateInput {
  username: string;
  password: string
  email: string
  role: UserRole

}

export interface UserRegisterDTO {
  username: string;
  email: string;
  password: string;
  role: UserRole.USER;
  created_at: Date;
}


export interface UserLoginDTO {
  email: string,
  password: string,
  role: UserRole.USER,   
}

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);
const phoneNumberValidation = new RegExp(/^((\+33|0)[6-7])\d{8}$/);

export type FormSchemaType= z.infer<typeof formSchema>;
export const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Le nom doit contenir au moins 4 caractères.',
  }).optional(),
  // phoneNumber: z.string().regex(phoneNumberValidation, {
  //   message: 'le numéro doit contenir au moins 10 chiffres.',
  // }),
  email: z.string().email({
    message: "L'adresse email n'est pas valide.",
  }),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    .regex(passwordValidation, {
      message:
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
    }),
});
