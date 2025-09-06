import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/requests";
import type { ApplicationResponse } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (err) {
        setError("Failed to fetch applications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="p-4 border rounded-md">
              <h2 className="text-xl font-semibold">{app.jobTitle}</h2>
              <p className="text-gray-600">Status: {app.status}</p>
              <p className="text-gray-500 text-sm">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationsPage;
