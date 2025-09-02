package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationRequest;
import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationResponse;
import io.github.iamrushier.jobconnect_backend.model.User;

import java.util.List;

public interface ApplicationService {
    ApplicationResponse applyForJob(ApplicationRequest applicationRequest, String username);

    List<ApplicationResponse> getMyApplications(String username);

    List<ApplicationResponse> getApplicationsForJob(Long jobId, String username);

    boolean existsByUser(User user);
}
