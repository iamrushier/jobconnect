package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.dto.user.UserResponse;

import java.util.List;

public interface AdminService {
    List<UserResponse> getAllUsers();

    List<JobResponse> getAllJobs();
}