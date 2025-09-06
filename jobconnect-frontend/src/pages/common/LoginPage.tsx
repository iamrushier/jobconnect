/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { fetchCurrentUser, login } from "../../api/requests";
import { setItem } from "../../utils/storage-helpers";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layout/AuthLayout";
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
        setUser(userResponse.data);

        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (userError) {
        // Even if user fetch fails, we can still redirect since login was successful
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Welcome back! Please enter your details."
      linkText="Don't have an account?"
      linkTo="/register"
      linkLabel="Sign up"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mt-1">
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {message && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">{message}</p>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
