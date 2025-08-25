/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { fetchCurrentUser, login } from "../api/requests";
import { setItem } from "../utils/storage-helpers";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");

    try {
      // Step 1: Login and get token
      const { data } = await login({ username, password });
      console.log("Login response:", data);

      // Step 2: Store tokens immediately
      setItem("token", data.token);
      setItem("role", data.role);
      if (data.refreshToken) {
        setItem("refreshToken", data.refreshToken);
      }

      // Step 3: Add a small delay to ensure token is stored properly
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Step 4: Fetch user data
      try {
        const userResponse = await fetchCurrentUser();
        console.log("User response:", userResponse.data);
        setUser(userResponse.data);

        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (userError) {
        console.error("Failed to fetch user data:", userError);
        // Even if user fetch fails, we can still redirect since login was successful
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md p-4 border rounded-lg shadow-sm"
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {message && <p className="text-green-600 text-sm">{message}</p>}
    </form>
  );
};

export default LoginPage;
