import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = null;
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        JobConnect
      </Link>
      <nav>
        {user ? (
          <div className="flex items-center space-x-4">Logout</div>
        ) : (
          <div className="space-x-2">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
