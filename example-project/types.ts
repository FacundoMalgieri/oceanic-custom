// Type definitions for the Oceanic Custom theme demo

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    active: boolean;
    createdAt: Date;
    lastLogin?: Date;
    preferences: UserPreferences;
}

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

export interface UserPreferences {
    theme: 'light' | 'dark' | 'oceanic';
    notifications: boolean;
    language: string;
    timezone: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface ThemeConfig {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        surface: string;
        text: string;
    };
    typography: {
        fontFamily: string;
        fontSize: number;
        lineHeight: number;
    };
}

// Utility types
export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export type Required<T> = {
    [P in keyof T]-?: T[P];
};

// Constants
export const USER_ROLES: Record<UserRole, string> = {
    admin: 'Administrator',
    moderator: 'Moderator',
    user: 'Regular User',
    guest: 'Guest User',
} as const;

export const THEME_COLORS = {
    oceanic: {
        primary: '#5CCFE6',
        secondary: '#89DDFF',
        accent: '#FF8F40',
        background: '#263238',
        surface: '#2F3E46',
        text: '#B3B1AD',
    },
} as const;
