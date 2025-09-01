export const API = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
  },
  USER: {
    ME: "/api/v1/user/me",
  },
  JOBS: {
    BASE: "/api/v1/jobs",
    SEARCH: "/api/v1/jobs/search",
    EMPLOYER: "/api/v1/jobs/employer",
  },
  APPLICATIONS: {
    BASE: "/api/v1/applications",
    MINE: "/api/v1/applications/my-applications",
    JOB: (jobId: number) => `/api/v1/applications/job/${jobId}`,
  },
  //   RESUMES: {
  //     UPLOAD: "/api/v1/resumes/upload",
  //     DOWNLOAD: (filename: string) => `/api/v1/resumes/download/${filename}`,
  //   },
  //   ADMIN: {
  //     USERS: "/api/v1/admin/users",
  //     JOBS: "/api/v1/admin/jobs",
  //   },
};
