import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (userData: User, accessToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:10000";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token");
        const storedUser = localStorage.getItem("auth_user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, accessToken: string) => {
        setUser(userData);
        setToken(accessToken);
        localStorage.setItem("auth_token", accessToken);
        localStorage.setItem("auth_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("onboarding_completed");
        localStorage.removeItem("user_preferences");
    };

    const value: AuthContextType = {
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user && !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { API_URL };
