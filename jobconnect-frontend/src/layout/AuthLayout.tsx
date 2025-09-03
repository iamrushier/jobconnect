import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkTo: string;
  linkLabel: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  linkText,
  linkTo,
  linkLabel,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Logo/Brand */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-blue-600">JobConnect</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>

        {/* Switch between login/register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {linkText}{" "}
            <Link
              to={linkTo}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {linkLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
