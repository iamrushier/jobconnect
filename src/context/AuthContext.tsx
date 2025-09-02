/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { UserResponse, LoginRequest, AuthResponse } from "../types";
import { fetchCurrentUser, login as apiLogin } from "../api/requests";
import { getItem, removeItem, setItem } from "../utils/storage-helpers";

interface AuthContextType {
  user: UserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  loading: boolean;
  login: (loginRequest: LoginRequest) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getItem("token");
      if (token) {
        try {
          console.log("Token found, fetching user data...");
          const userResponse = await fetchCurrentUser();
          console.log("User data fetched successfully:", userResponse.data);
          setUser(userResponse.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          // Clear invalid token
          removeItem("token");
          removeItem("role");
          removeItem("refreshToken");
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (loginRequest: LoginRequest) => {
    const response = await apiLogin(loginRequest);
    setItem("token", response.data.token);
    setItem("role", response.data.role);
    if (response.data.refreshToken) {
      setItem("refreshToken", response.data.refreshToken);
    }
    const userResponse = await fetchCurrentUser();
    setUser(userResponse.data);
    return response.data;
  };

  const logout = () => {
    removeItem("token");
    removeItem("role");
    removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};