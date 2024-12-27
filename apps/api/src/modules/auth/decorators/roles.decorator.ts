import { UserRole } from '../types/enum.types';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
import { CustomDecorator } from '@nestjs/common';

export const Roles = (
  ...roles: [UserRole, ...UserRole[]]
): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
