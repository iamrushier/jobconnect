import type { AxiosInstance } from "axios";
import axios from "axios";
import { getItem } from "../utils/storage-helpers";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
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