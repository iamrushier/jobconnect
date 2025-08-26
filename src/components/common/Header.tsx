import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { removeItem } from "../../utils/storage-helpers";

const Header = () => {
  const { user, setUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show navigation links on login/register pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    // Clear all stored data
    removeItem("token");
    removeItem("role");
    removeItem("refreshToken");

    // Clear user from context
    setUser(null);

    // Navigate to home page
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        JobConnect
      </Link>

      {!isAuthPage && (
        <nav>
          {loading ? (
            // Show loading state while checking authentication
            <div className="text-gray-500">Loading...</div>
          ) : user ? (
            // Show authenticated user menu
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            // Show login/register links for non-authenticated users
            <div className="space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
