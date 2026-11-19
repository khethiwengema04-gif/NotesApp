
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../Types/User';
import { registerUser, loginUser, getSession, saveSession, removeSession } from '../Storage/AuthStorage';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    register: (user: User) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if a user is already logged in
    useEffect(() => {
        const checkUser = async () => {
            const savedUser = await getSession();
            setUser(savedUser);
            setLoading(false);
        };

        checkUser();
    }, []);

    // Register a user
    const register = async (newUser: User) => {
        await registerUser(newUser);
        await saveSession(newUser);
        setUser(newUser);
    };

    // Login a user
    const login = async (email: string, password: string) => {
        const loggedInUser = await loginUser(email, password);

        if (!loggedInUser) {
            throw new Error('Invalid email or password');
        }

        await saveSession(loggedInUser);
        setUser(loggedInUser);
    };

    // Logout a user
    const logout = async () => {
        await removeSession();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Access authentication information
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};
