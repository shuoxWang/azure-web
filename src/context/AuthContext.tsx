import { createContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    handleLogin: (token: string) => void;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, SetisAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        SetisAuthenticated(!!token);
    }, []);

    const handleLogin = (token: string) => {
        localStorage.setItem('accessToken', token);
        SetisAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        SetisAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout}}>{children}</AuthContext.Provider>
    );
};
