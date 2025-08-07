package io.github.iamrushier.jobconnect_backend.controller;

import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationRequest;
import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationResponse;
import io.github.iamrushier.jobconnect_backend.service.ApplicationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
@Tag(name="Job Application APIs")
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    @PreAuthorize("hasAuthority('JOB_SEEKER')")     //    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<ApplicationResponse> applyForJob(@RequestBody ApplicationRequest applicationRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.applyForJob(applicationRequest, userDetails.getUsername()));
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasAuthority('JOB_SEEKER')")     //    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.getMyApplications(userDetails.getUsername()));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAuthority('EMPLOYER')")     //    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForJob(@PathVariable Long jobId, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId, userDetails.getUsername()));
    }
}
