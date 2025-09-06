import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/common/HomePage";
import LoginPage from "../pages/common/LoginPage";
import RegisterPage from "../pages/common/RegisterPage";
import ProfilePage from "../pages/common/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../components/NotFoundPage";
import JobsPage from "../pages/jobseeker/JobsPage";
import ApplicationsPage from "../pages/jobseeker/ApplicationsPage";
import EmployerJobsPage from "../pages/employer/EmployerJobsPage";
import CreateJobPage from "../pages/employer/CreateJobPage";
import EditJobPage from "../pages/employer/EditJobPage";
import JobApplicationsPage from "../pages/employer/JobApplicationsPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminJobsPage from "../pages/admin/AdminJobsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />

      {/* Auth routes - redirect to home if already logged in */}
      <Route
        path="/login"
        element={
          <ProtectedRoute requireAuth={false}>
            <LoginPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute requireAuth={false}>
            <RegisterPage />
          </ProtectedRoute>
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Future protected routes */}
      <Route
        path="/jobs"
        element={
          <ProtectedRoute role="JOB_SEEKER">
            <JobsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute role="JOB_SEEKER">
            <ApplicationsPage />
          </ProtectedRoute>
        }
      />

      {/* Employer routes */}
      <Route
        path="/employer/jobs"
        element={
          <ProtectedRoute role="EMPLOYER">
            <EmployerJobsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs/create"
        element={
          <ProtectedRoute role="EMPLOYER">
            <CreateJobPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs/edit/:id"
        element={
          <ProtectedRoute role="EMPLOYER">
            <EditJobPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs/:jobId/applications"
        element={
          <ProtectedRoute role="EMPLOYER">
            <JobApplicationsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminUsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminJobsPage />
          </ProtectedRoute>
        }
      />

      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
