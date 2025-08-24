import React, { useState } from "react";
import { register } from "../api/requests";
import { setItem } from "../utils/storage-helpers";
import { useNavigate } from "react-router-dom";
import type { Role } from "../types";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("JOB_SEEKER");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    console.log({ username, password, email, role });

    try {
      const { data } = await register({ username, password, email, role });
      setItem("token", data.token);
      setItem("role", data.role);
      if (data.refreshToken) {
        setItem("refreshToken", data.refreshToken);
      }
      setMessage("Registered successfully! Navigating to login page...");
      // Navigate to login page using useNavigate
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error("Registration failed:", error);
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
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="JOB_SEEKER">Job Seeker</option>
          <option value="EMPLOYER">Employer</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
};

export default RegisterPage;
