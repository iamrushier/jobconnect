package io.github.iamrushier.jobconnect_backend.controller;

import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationRequest;
import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationResponse;
import io.github.iamrushier.jobconnect_backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<ApplicationResponse> applyForJob(@RequestBody ApplicationRequest applicationRequest, @AuthenticationPrincipal String username) {
        return ResponseEntity.ok(applicationService.applyForJob(applicationRequest, username));
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(@AuthenticationPrincipal String username) {
        return ResponseEntity.ok(applicationService.getMyApplications(username));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForJob(@PathVariable Long jobId, @AuthenticationPrincipal String username) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId, username));
    }
}
