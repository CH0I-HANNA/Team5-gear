'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { login as apiLogin, signup as apiSignup, getUser } from '../lib/auth';
import { LoginRequest, SignUpRequest, User } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null; // Add user to the context
    login: (credentials: LoginRequest) => Promise<void>;
    signup: (userData: SignUpRequest) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null); // Add user state

    useEffect(() => {
        const storedToken = Cookies.get('accessToken');
        if (storedToken) {
            setToken(storedToken);
            getUser(storedToken).then(setUser).catch(() => {
                // Handle error fetching user, e.g., token expired
                logout();
            });
        }
    }, []);

    const login = async (credentials: LoginRequest) => {
        const data = await apiLogin(credentials);
        setToken(data.accessToken);
        Cookies.set('accessToken', data.accessToken);
        const userData = await getUser(data.accessToken); // Fetch user data
        setUser(userData); // Set user state
    };

    const signup = async (userData: SignUpRequest) => {
        await apiSignup(userData);
        // Maybe automatically log in the user after signup
    };

    const logout = () => {
        setToken(null);
        setUser(null); // Clear user state
        Cookies.remove('accessToken');
    };

    const updateUser = (newUser: User) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, token, user, login, signup, logout, updateUser }}>
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
