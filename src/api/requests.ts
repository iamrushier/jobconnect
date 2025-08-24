import type { AxiosInstance } from "axios";
import axios from "axios";
import { getItem } from "../utils/storage-helpers";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";
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
