import { useEffect, useState } from "react";
import { getJobById, applyForJob, getMyResume } from "../api/requests";
import type { JobResponse, ResumeResponse } from "../types";
import LoadingSpinner from "./LoadingSpinner";

interface JobDetailsModalProps {
  jobId: number;
  onClose: () => void;
}

const JobDetailsModal = ({ jobId, onClose }: JobDetailsModalProps) => {
  const [job, setJob] = useState<JobResponse | null>(null);
  const [resume, setResume] = useState<ResumeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobAndResume = async () => {
      try {
        const jobData = await getJobById(jobId);
        setJob(jobData);
        try {
          const resumeData = await getMyResume();
          setResume(resumeData);
        } catch (error) {
          // User may not have a resume
        }
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobAndResume();
  }, [jobId]);

  const handleApply = async () => {
    if (job && resume) {
      try {
        await applyForJob({ jobId: job.id, resumeId: resume.id });
        window.alert("Successfully applied for the job!");
        onClose();
      } catch (err) {
        window.alert("Failed to apply for the job.");
      }
    } else if (!resume) {
      window.alert("Please upload a resume before applying.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <p className="text-gray-600 mb-4">{job.location}</p>
        <p className="mb-4">{job.description}</p>
        <div className="mb-4">
          <span className="font-semibold">Salary:</span> ${job.minSalary} - $
          {job.maxSalary}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Close
          </button>
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={!resume}
          >
            {resume ? "Apply" : "Upload Resume to Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
