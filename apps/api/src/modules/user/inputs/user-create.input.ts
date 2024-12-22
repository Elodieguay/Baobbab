import { UserRole } from "../../auth/types/enum.types";

export interface UserCreateInput {
    username: string;
    password: string
    email: string
    role: UserRole

}

