export interface LoginResponse {
  access_token: string;
  userId: string;
  username: string;
}

export class AuthPayloadDto {
  email: string;
  password: string;
}
