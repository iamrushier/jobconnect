import type { AxiosInstance } from "axios";
import axios from "axios";
import { getItem } from "../utils/storage-helpers";
import type {
  ApplicationRequest,
  ApplicationResponse,
  AuthResponse,
  JobRequest,
  JobResponse,
  JobSearchParams,
  LoginRequest,
  PagedResponse,
  RegisterRequest,
  ResumeResponse,
  UpdateApplicationStatusRequest,
  UserResponse,
} from "../types";
import { API } from "./endpoints";
const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: This will be called before every request
// Working: Adding Authorization header with token
httpClient.interceptors.request.use(
  (config) => {
    const token = getItem<string>("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (data: LoginRequest) => {
  return httpClient.post<AuthResponse>(API.AUTH.LOGIN, data);
};

export const register = (data: RegisterRequest) => {
  return httpClient.post<AuthResponse>(API.AUTH.REGISTER, data);
};

// Fixed: Added proper async/await and error handling
export const fetchCurrentUser = async () => {
  const response = await httpClient.get<UserResponse>(API.USER.ME);
  return response;
};

export const updateUserName = async (
  username: string
): Promise<UserResponse> => {
  const response = await httpClient.put<UserResponse>(API.USER.ME, username);
  return response.data;
};

export const searchJobs = async (params: JobSearchParams) => {
  const queryParams = new URLSearchParams();
  if (params.keyword) queryParams.append("keyword", params.keyword);
  if (params.location) queryParams.append("location", params.location);
  queryParams.append("page", (params.page || 0).toString());
  queryParams.append("size", (params.size || 10).toString());

  const response = await httpClient.get<PagedResponse<JobResponse>>(
    `${API.JOBS.SEARCH}?${queryParams.toString()}`
  );
  return response.data;
};

export const createJob = async (jobRequest: JobRequest) => {
  const response = await httpClient.post<JobResponse>(
    API.JOBS.BASE,
    jobRequest
  );
  return response.data;
};

export const getJobById = async (id: number) => {
  const response = await httpClient.get<JobResponse>(`${API.JOBS.BASE}/${id}`);
  return response.data;
};

export const getAllJobsByEmployer = async () => {
  const response = await httpClient.get<JobResponse[]>(API.JOBS.EMPLOYER);
  return response.data;
};

export const updateJob = async (id: number, jobRequest: JobRequest) => {
  const response = await httpClient.put<JobResponse>(
    `${API.JOBS.BASE}/${id}`,
    jobRequest
  );
  return response.data;
};

export const deleteJob = async (id: number) => {
  await httpClient.delete(`${API.JOBS.BASE}/${id}`);
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await httpClient.post<string>(API.RESUMES.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getMyResume = async () => {
  const response = await httpClient.get<ResumeResponse>(API.RESUMES.MINE);
  return response.data;
};

export const deleteMyResume = async () => {
  await httpClient.delete(API.RESUMES.MINE);
};

export const downloadResume = async (filename: string) => {
  const response = await httpClient.get(API.RESUMES.DOWNLOAD(filename), {
    responseType: "blob",
  });
  return response.data;
};

export const applyForJob = async (applicationRequest: ApplicationRequest) => {
  const response = await httpClient.post<ApplicationResponse>(
    API.APPLICATIONS.BASE,
    applicationRequest
  );
  return response.data;
};

export const getMyApplications = async () => {
  const response = await httpClient.get<ApplicationResponse[]>(
    API.APPLICATIONS.MINE
  );
  return response.data;
};

export const getApplicationsForJob = async (jobId: number) => {
  const response = await httpClient.get<ApplicationResponse[]>(
    API.APPLICATIONS.JOB(jobId)
  );
  return response.data;
};

export const updateApplicationStatus = async (
  applicationId: number,
  status: UpdateApplicationStatusRequest
) => {
  const response = await httpClient.put<ApplicationResponse>(
    API.APPLICATIONS.UPDATE_STATUS(applicationId),
    status
  );
  return response.data;
};

export const getAllUsers = async () => {
  const response = await httpClient.get<UserResponse[]>(API.ADMIN.USERS);
  return response.data;
};

export const getAllJobs = async () => {
  const response = await httpClient.get<JobResponse[]>(API.ADMIN.JOBS);
  return response.data;
};
