import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
import { CustomDecorator } from '@nestjs/common';
import { UserRole } from 'src/dtos/enum';

export const Roles = (
  ...roles: [UserRole, ...UserRole[]]
): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
