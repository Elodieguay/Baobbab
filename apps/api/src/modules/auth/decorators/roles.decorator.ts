import { UserRole } from "../types/enum.types";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserRole, ...UserRole[]]) => SetMetadata(ROLES_KEY, roles);