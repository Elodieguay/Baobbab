
export interface LoginResponse  {
    access_token: string
    userId: string
}

export class AuthPayloadDto {
    username: string
    password: string
}