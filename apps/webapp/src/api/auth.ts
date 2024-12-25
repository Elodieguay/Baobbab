import { UserLoginDTO, UserRegisterDTO } from "@baobbab/dtos";
import { config } from "../config"
import ky from "ky";
import z from "zod";

const registerSchema = z.object({
  username: z.string().min(4).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER"]),
})

// cette fonction permet d'enregistrer un utilisateur

export async function registerUser(createUser: UserRegisterDTO) : Promise<UserRegisterDTO> {
  console.log("createUser", createUser);
  
  const validationResult = registerSchema.safeParse(createUser);
  console.log("validationResult", validationResult);
  
  if (!validationResult.success) {
    console.error("Validation failed:", validationResult.error);
    throw new Error("Validation error: invalid input data")
  }

  try {
    const url = `${config.apiUrl}/auth/register`;
    console.log("url", url);
    
    const response = await ky 
      .post(url, {json: createUser})
      .json() as UserRegisterDTO;
    console.log("response", response);
    return response;
  }
  catch (error) {
    console.error("error registering user", error);
    throw error;
  }
}

export async function loginUser(loginUser: UserLoginDTO): Promise<UserLoginDTO> {
  const validationResult = registerSchema.safeParse(loginUser);
  console.log("validationResult", validationResult);

  if (!validationResult.success) {
    console.error("Validation failed:", validationResult.error);
    throw new Error("Validation error: invalid input data");
  }

  try {
    const url = `${config.apiUrl}/auth/login`;
    const response = await ky
      .post(url, {json: loginUser})
      .json() as UserLoginDTO;
      console.log('ApiResponseLogin', response);
      
    return response;
  }
  catch (error) {
    console.error("error logging in user", error);
    throw error;
  }
  
}