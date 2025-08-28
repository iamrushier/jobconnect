import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      // <div className="flex items-center justify-center min-h-[400px]">
      //   <div className="text-center">
      //     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      //     <p className="mt-4 text-gray-600">Loading...</p>
      //   </div>
      // </div>
      <LoadingSpinner />
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to JobConnect
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your gateway to finding the perfect job or the ideal candidate
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Get Started - Login
            </Link>
            <Link
              to="/register"
              className="inline-block px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Features section for non-logged in users */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="text-center p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">For Job Seekers</h3>
            <p className="text-gray-600">
              Find your dream job from thousands of opportunities posted by top
              employers.
            </p>
          </div>
          <div className="text-center p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">For Employers</h3>
            <p className="text-gray-600">
              Post jobs and connect with qualified candidates to grow your team.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-gray-600 mb-4">
          Role:{" "}
          <span className="font-medium">{user.role?.replace("_", " ")}</span>
        </p>

        {/* Quick actions based on user role */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {user.role === "JOB_SEEKER" ? (
            <>
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold mb-2">Browse Jobs</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Discover new opportunities that match your skills
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Jobs →
                </button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold mb-2">My Applications</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Track your job application status
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Applications →
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold mb-2">Post a Job</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Find the perfect candidate for your open position
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Create Job Post →
                </button>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold mb-2">Manage Jobs</h3>
                <p className="text-sm text-gray-600 mb-3">
                  View and manage your posted jobs
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View My Jobs →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity to show.</p>
          <p className="text-sm mt-2">Start by exploring the platform!</p>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
