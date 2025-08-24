export type Role = "JOB_SEEKER" | "EMPLOYER" | "ADMIN";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  role: Role;
}
