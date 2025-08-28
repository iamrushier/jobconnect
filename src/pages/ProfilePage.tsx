import React from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserName } from "../api/requests";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../utils/storage-helpers";

const ProfilePage: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const [editMode, setEditMode] = React.useState(false);
  const [newUsername, setNewUsername] = React.useState(user!.username);
  const navigate = useNavigate();

  const handleEditUsername = async (newUsername: string) => {
    const updatedUser = await updateUserName(newUsername);
    setUser(updatedUser);
    window.alert("Username updated successfully. You will be logged out.");
    setUser(null);
    removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to view your profile
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        {/* Profile Header */}
        <div className="px-6 py-8 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {user.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.username}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {user.role?.replace("_", " ") || "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="px-6 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Profile Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              ) : (
                <div className="p-3 bg-gray-50 border rounded-md">
                  <p className="text-gray-900">{user.username}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="p-3 bg-gray-50 border rounded-md">
                <p className="text-gray-900">{user.email || "Not provided"}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="p-3 bg-gray-50 border rounded-md">
                <p className="text-gray-900">
                  {user.role?.replace("_", " ") || "Not specified"}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <div className="p-3 bg-gray-50 border rounded-md">
                <p className="text-gray-900">{user.id || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Edit Username Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => {
                if (editMode) {
                  handleEditUsername(newUsername);
                }
                setEditMode(!editMode);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editMode ? "Save changes" : "Edit Username"}
            </button>
          </div>
        </div>

        {/* Role-specific sections */}
        <div className="px-6 py-6 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {user.role === "JOB_SEEKER"
              ? "Job Seeker Dashboard"
              : "Employer Dashboard"}
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {user.role === "JOB_SEEKER" ? (
              <>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900">Applications</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">0</p>
                  <p className="text-sm text-blue-700">Active applications</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900">Interviews</h3>
                  <p className="text-2xl font-bold text-green-600 mt-2">0</p>
                  <p className="text-sm text-green-700">Scheduled interviews</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-medium text-purple-900">Saved Jobs</h3>
                  <p className="text-2xl font-bold text-purple-600 mt-2">0</p>
                  <p className="text-sm text-purple-700">Jobs saved</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900">Job Posts</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-2">0</p>
                  <p className="text-sm text-blue-700">Active job posts</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900">Applications</h3>
                  <p className="text-2xl font-bold text-green-600 mt-2">0</p>
                  <p className="text-sm text-green-700">
                    Total applications received
                  </p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h3 className="font-medium text-orange-900">Candidates</h3>
                  <p className="text-2xl font-bold text-orange-600 mt-2">0</p>
                  <p className="text-sm text-orange-700">
                    Shortlisted candidates
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Debug Information (can be removed in production) */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <details className="cursor-pointer">
            <summary className="text-sm font-medium text-gray-700">
              Debug Information (Development Only)
            </summary>
            <pre className="mt-2 text-xs text-gray-600 bg-white p-3 rounded border overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
