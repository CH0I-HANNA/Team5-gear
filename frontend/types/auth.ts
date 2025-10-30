export interface User {
    profileImage: string | null;
    nickname: string;
    email: string;
    joinDate: string;
}

export interface SignUpRequest {
    username?: string;
    email?: string;
    password?: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}
