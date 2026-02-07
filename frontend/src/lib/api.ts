const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export interface SignupData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    primaryGoal?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface UserPreferences {
    email: string;
    name: string;
    useCase: string;
    niches: string[];
    formats: string[];
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    user?: T;
    error?: string;
}

/**
 * Signup a new user
 */
export const signup = async (data: SignupData): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || "Signup failed" };
        }

        return result;
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, error: "Network error. Please try again." };
    }
};

/**
 * Login existing user
 */
export const login = async (data: LoginData): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || "Login failed" };
        }

        return result;
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Network error. Please try again." };
    }
};

/**
 * Update user preferences (onboarding)
 */
export const updatePreferences = async (data: UserPreferences): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/preferences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || "Failed to save preferences" };
        }

        return result;
    } catch (error) {
        console.error("Preferences error:", error);
        return { success: false, error: "Network error. Please try again." };
    }
};

/**
 * Check API health
 */
export const checkHealth = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch {
        return false;
    }
};
