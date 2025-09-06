import { useEffect, useState } from "react";
import { getAllJobs } from "../../api/requests";
import type { JobResponse } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
      } catch (err) {
        setError("Failed to fetch jobs.");
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
      <h1 className="text-3xl font-bold mb-8">Admin Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-green-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-green-200 mb-1">{job.location}</p>
            <p className="text-sm text-green-300">
              Employer ID: {job.employerId}
            </p>
            <p className="text-xs text-green-400 mt-2">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminJobsPage;
