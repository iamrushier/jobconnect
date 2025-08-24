/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { login } from "../api/requests";
import { setItem } from "../utils/storage-helpers";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      const { data } = await login({ username, password });
      setItem("token", data.token);
      setItem("role", data.role);
      if (data.refreshToken) {
        setItem("refreshToken", data.refreshToken);
      }
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      setLoading(false);
    }
  };

  return (
    // <div className="flex items-center justify-center h-full">
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
