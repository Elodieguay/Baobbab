import { UserRole } from '@baobbab/dtos';

export interface UserCreateInput {
  username: string;
  password: string;
  email: string;
  role: UserRole.USER;
}
