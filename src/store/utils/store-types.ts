type UserStatus = "ACTIVE" | "INACTIVE"; 
type UserRole = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    createdAt: string; 
  }

export interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    // refreshToken: string | null;
    userInfo: User | null; 
    error: string;
    success: boolean;
  }
  