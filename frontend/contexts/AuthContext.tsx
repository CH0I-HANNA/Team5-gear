'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, signup as apiSignup } from '../lib/auth';
import { LoginRequest, SignUpRequest } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: (credentials: LoginRequest) => Promise<void>;
    signup: (userData: SignUpRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (credentials: LoginRequest) => {
        const data = await apiLogin(credentials);
        setToken(data.accessToken);
        localStorage.setItem('token', data.accessToken);
    };

    const signup = async (userData: SignUpRequest) => {
        await apiSignup(userData);
        // Maybe automatically log in the user after signup
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
