import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/requests";
import type { UserResponse } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-blue-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-xl font-semibold mb-2">{user.username}</p>
            <p className="text-blue-200 mb-1">{user.email}</p>
            <p className="text-sm text-blue-300">Role: {user.role}</p>
            <p className="text-xs text-blue-400 mt-2">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
