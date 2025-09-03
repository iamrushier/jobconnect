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

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface JobRequest {
  title: string;
  description: string;
  location: string;
  minSalary?: number;
  maxSalary?: number;
}

// Jobs related
export interface JobResponse {
  id: number;
  title: string;
  description: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  createdAt: string;
  updatedAt: string;
  employerId: number;
}
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
export interface JobSearchParams {
  keyword?: string;
  location?: string;
  page?: number;
  size?: number;
}

export interface ResumeResponse {
  id: number;
  filename: string;
  originalFilename: string;
  contentType: string;
  size: number;
}

export const ApplicationStatus = {
  Pending: "PENDING",
  Viewed: "VIEWED",
  Assessing: "ASSESSING",
  Selected: "SELECTED",
  Rejected: "REJECTED",
} as const;

export type ApplicationStatus =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

export interface ApplicationRequest {
  jobId: number;
  resumeId: number;
}

export interface ApplicationResponse {
  id: number;
  jobId: number;
  jobTitle: string;
  userId: number;
  username: string;
  resumeFilename: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus;
}
