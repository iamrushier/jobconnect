package io.github.iamrushier.jobconnect_backend.controller;

import io.github.iamrushier.jobconnect_backend.dto.job.JobRequest;
import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name="Job APIs")
public class JobController {

    private final JobService jobService;

    @PostMapping
    @PreAuthorize("hasAuthority('EMPLOYER')")
    @Operation(summary = "Create a job posting as employer")
    public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest jobRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(jobService.createJob(jobRequest, userDetails.getUsername()), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @GetMapping("/employer")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<List<JobResponse>> getAllJobsByEmployer(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(jobService.getAllJobsByEmployer(userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<JobResponse> updateJob(@PathVariable Long id, @Valid @RequestBody JobRequest jobRequest, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(jobService.updateJob(id, jobRequest, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('EMPLOYER')")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        jobService.deleteJob(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
