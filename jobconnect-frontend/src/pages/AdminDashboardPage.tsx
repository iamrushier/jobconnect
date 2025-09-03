import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-12">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link
          to="/admin/users"
          className="bg-blue-700 hover:bg-blue-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">Manage Users</h2>
          <p className="text-blue-200 text-center">View and manage all registered users in the system.</p>
        </Link>
        <Link
          to="/admin/jobs"
          className="bg-green-700 hover:bg-green-600 text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center transition-colors duration-300"
        >
          <h2 className="text-3xl font-bold mb-4">Manage Jobs</h2>
          <p className="text-green-200 text-center">Oversee and manage all job postings across the platform.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;