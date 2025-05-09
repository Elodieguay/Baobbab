import { UserRole } from 'src/dtos/enum';

export interface UserCreateInput {
  username: string;
  password: string;
  email: string;
  role: UserRole.USER;
}
