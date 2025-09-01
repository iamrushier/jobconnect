import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobsByEmployer, deleteJob } from "../api/requests";
import type { JobResponse } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const EmployerJobsPage = () => {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobsByEmployer();
        setJobs(data);
      } catch (err) { 
        setError("Failed to fetch jobs.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter((job) => job.id !== id));
      } catch (err) {
        setError("Failed to delete job.");
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Jobs</h1>
      <Link to="/employer/jobs/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create Job
      </Link>
      {jobs.length === 0 ? (
        <p>You have not created any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="p-4 border rounded-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.location}</p>
              <div className="mt-4 space-x-2">
                <Link to={`/employer/jobs/edit/${job.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded">
                  Edit
                </Link>
                <button onClick={() => handleDelete(job.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployerJobsPage;
