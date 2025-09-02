import type { AxiosInstance } from "axios";
import axios from "axios";
import { getItem } from "../utils/storage-helpers";
import type {
  AuthResponse,
  JobRequest,
  JobResponse,
  JobSearchParams,
  LoginRequest,
  PagedResponse,
  RegisterRequest,
  ResumeResponse,
  UserResponse,
} from "../types";
import { API } from "./endpoints";

const httpClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
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
    console.error("Error in request interceptor", error);
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
  try {
    console.log("Requesting current user...");
    const response = await httpClient.get<UserResponse>(API.USER.ME);
    console.log("User data received:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateUserName = async (
  username: string
): Promise<UserResponse> => {
  try {
    const response = await httpClient.put<UserResponse>(API.USER.ME, username);
    return response.data;
  } catch (error) {
    console.error("Error updating user name:", error);
    throw error;
  }
};

export const searchJobs = async (params: JobSearchParams) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.keyword) queryParams.append("keyword", params.keyword);
    if (params.location) queryParams.append("location", params.location);
    queryParams.append("page", (params.page || 0).toString());
    queryParams.append("size", (params.size || 10).toString());

    const response = await httpClient.get<PagedResponse<JobResponse>>(
      `${API.JOBS.SEARCH}?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching jobs:", error);
    throw error;
  }
};

export const createJob = async (jobRequest: JobRequest) => {
  try {
    const response = await httpClient.post<JobResponse>(
      API.JOBS.BASE,
      jobRequest
    );
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const getJobById = async (id: number) => {
  try {
    const response = await httpClient.get<JobResponse>(`${API.JOBS.BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with id ${id}:`, error);
    throw error;
  }
};

export const getAllJobsByEmployer = async () => {
  try {
    const response = await httpClient.get<JobResponse[]>(API.JOBS.EMPLOYER);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs by employer:", error);
    throw error;
  }
};

export const updateJob = async (id: number, jobRequest: JobRequest) => {
  try {
    const response = await httpClient.put<JobResponse>(
      `${API.JOBS.BASE}/${id}`,
      jobRequest
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating job with id ${id}:`, error);
    throw error;
  }
};

export const deleteJob = async (id: number) => {
  try {
    await httpClient.delete(`${API.JOBS.BASE}/${id}`);
  } catch (error) {
    console.error(`Error deleting job with id ${id}:`, error);
    throw error;
  }
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await httpClient.post<string>(
      API.RESUMES.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};

export const getMyResume = async () => {
  try {
    const response = await httpClient.get<ResumeResponse>(API.RESUMES.MINE);
    return response.data;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};

export const deleteMyResume = async () => {
  try {
    await httpClient.delete(API.RESUMES.MINE);
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
};

export const downloadResume = async (filename: string) => {
  try {
    const response = await httpClient.get(
      API.RESUMES.DOWNLOAD(filename),
      {
        responseType: "blob",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error downloading resume:", error);
    throw error;
  }
};