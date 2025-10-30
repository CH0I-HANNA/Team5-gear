import { LoginRequest, SignUpRequest } from '../types/auth';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (credentials: LoginRequest) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

export const signup = async (userData: SignUpRequest) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
    }

    return response.json();
};

export const getUser = async (token: string) => {
    const response = await fetch('http://localhost:8080/api/user/me', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return response.json();
};
