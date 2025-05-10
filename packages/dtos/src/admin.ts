import { UserRole } from './enum';

export class SuperAdminDTO {
    role: UserRole;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}