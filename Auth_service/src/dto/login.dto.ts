export interface LoginDto {
    email: string;
    password: string;
}

export interface RefreshTokenDto {
    refreshToken: string;
}

export interface LogoutDto {
    refreshToken: string;
}