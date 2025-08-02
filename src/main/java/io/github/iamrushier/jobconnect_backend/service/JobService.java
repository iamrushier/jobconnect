package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.dto.job.JobRequest;
import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;

import java.util.List;

public interface JobService {
    JobResponse createJob(JobRequest jobRequest, String username);
    JobResponse getJobById(Long id);
    List<JobResponse> getAllJobsByEmployer(String username);
    JobResponse updateJob(Long id, JobRequest jobRequest, String username);
    void deleteJob(Long id, String username);
}
