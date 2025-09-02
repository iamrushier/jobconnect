/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  updateUserName,
  uploadResume,
  getMyResume,
  deleteMyResume,
  downloadResume,
} from "../api/requests";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../utils/storage-helpers";
import type { ResumeResponse } from "../types";

const ProfilePage: React.FC = () => {
  const { user, loading, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(user!.username);
  const [resume, setResume] = useState<ResumeResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "JOB_SEEKER") {
      const fetchResume = async () => {
        try {
          const resumeData = await getMyResume();
          setResume(resumeData);
        } catch (error: any) {
          // It's okay if the user doesn't have a resume yet
        }
      };
      fetchResume();
    }
  }, [user]);

  const handleEditUsername = async (newUsername: string) => {
    const updatedUser = await updateUserName(newUsername);
    setUser(updatedUser);
    window.alert("Username updated successfully. You will be logged out.");
    setUser(null);
    removeItem("token");
    navigate("/login");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        await uploadResume(e.target.files[0]);
        const resumeData = await getMyResume();
        setResume(resumeData);
        window.alert("Resume uploaded successfully.");
      } catch (error: any) {
        window.alert("Failed to upload resume. " + error?.message);
      }
    }
  };

  const handleRemoveResume = async () => {
    if (window.confirm("Are you sure you want to remove your resume?")) {
      try {
        await deleteMyResume();
        setResume(null);
        window.alert("Resume removed successfully.");
      } catch (error: any) {
        window.alert(
          "Failed to remove resume. " + error?.response?.data?.message
        );
        console.log("Error details:", error);
      }
    }
  };

  const handleDownloadResume = async () => {
    if (resume) {
      try {
        const blob = await downloadResume(resume.filename);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = resume.originalFilename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error: any) {
        window.alert("Failed to download resume. " + error?.message);
      }
    }
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

        {user.role === "JOB_SEEKER" && (
          <div className="px-6 py-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Resume
            </h2>
            <div className="p-4 bg-gray-50 border rounded-md">
              {resume ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{resume.originalFilename}</p>
                    <p className="text-sm text-gray-500">
                      {(resume.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDownloadResume}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </button>
                    <label className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors cursor-pointer">
                      Replace
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <button
                      onClick={handleRemoveResume}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-900 mb-4">
                    Upload your resume to easily apply for jobs.
                  </p>
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                    Upload Resume
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
