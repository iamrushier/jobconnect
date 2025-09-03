import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NotFoundPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[600px] flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-100 mb-4">404</div>
          <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Error message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium"
          >
            Go to Homepage
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="inline-block px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
            >
              Go to Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block px-6 py-3 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md transition-colors font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {/* Help text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Need help? Contact our support team or check the{" "}
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              homepage
            </Link>{" "}
            for available options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
