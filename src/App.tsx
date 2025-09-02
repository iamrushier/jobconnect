import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFoundPage from "./components/NotFoundPage";
import Footer from "./components/Footer";
import JobsPage from "./pages/JobsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import EmployerJobsPage from "./pages/EmployerJobsPage";
import CreateJobPage from "./pages/CreateJobPage";
import EditJobPage from "./pages/EditJobPage";
import JobApplicationsPage from "./pages/JobApplicationsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminJobsPage from "./pages/AdminJobsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />

          <main className="container mx-auto px-4 py-6">
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
                  <ProtectedRoute>
                    <JobsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
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
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
