/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { UserResponse } from "../types";
import { fetchCurrentUser } from "../api/requests";
import { getItem, removeItem } from "../utils/storage-helpers";

interface AuthContextType {
  user: UserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  loading: boolean;
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
      } else {
        console.log("No token found");
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
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
