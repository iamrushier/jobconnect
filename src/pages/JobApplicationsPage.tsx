import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationsForJob,
  updateApplicationStatus,
  downloadResume,
} from "../api/requests";
import type {
  ApplicationResponse,
  UpdateApplicationStatusRequest,
} from "../types";
import { ApplicationStatus } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

const JobApplicationsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (jobId) {
        try {
          const data = await getApplicationsForJob(parseInt(jobId, 10));
          setApplications(data);
        } catch (err) {
          setError("Failed to fetch applications.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (
    applicationId: number,
    status: ApplicationStatus
  ) => {
    try {
      const request: UpdateApplicationStatusRequest = { status };
      const updatedApplication = await updateApplicationStatus(
        applicationId,
        request
      );
      setApplications(
        applications.map((app) =>
          app.id === applicationId ? updatedApplication : app
        )
      );
    } catch (err) {
      window.alert("Failed to update application status.");
    }
  };

  const handleDownload = async (resumeFilename: string) => {
    try {
      const blob = await downloadResume(resumeFilename);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resumeFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      window.alert("Failed to download resume.");
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
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found for this job.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div key={app.id} className="p-4 border rounded-md">
              <h2 className="text-xl font-semibold">
                Applicant: {app.username}
              </h2>
              <p className="text-gray-600">Status: {app.status}</p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleDownload(app.resumeFilename)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Download Resume
                </button>
                <select
                  value={app.status}
                  onChange={(e) =>
                    handleStatusChange(
                      app.id,
                      e.target.value as ApplicationStatus
                    )
                  }
                  className="w-full p-2 border rounded-md"
                >
                  {Object.values(ApplicationStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobApplicationsPage;
