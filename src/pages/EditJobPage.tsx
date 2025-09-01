import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../api/requests";
import type { JobRequest } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const EditJobPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (id) {
          const data = await getJobById(parseInt(id, 10));
          setJob(data);
        }
      } catch (err) {
        setError("Failed to fetch job.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (job) {
      setJob({ ...job, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (job && id) {
      try {
        await updateJob(parseInt(id, 10), job);
        navigate("/employer/jobs");
      } catch (err) {
        setError("Failed to update job.");
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-semibold">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={job.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={job.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-semibold">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={job.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="minSalary" className="block font-semibold">Minimum Salary</label>
          <input
            type="number"
            id="minSalary"
            name="minSalary"
            value={job.minSalary}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="maxSalary" className="block font-semibold">Maximum Salary</label>
          <input
            type="number"
            id="maxSalary"
            name="maxSalary"
            value={job.maxSalary}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
