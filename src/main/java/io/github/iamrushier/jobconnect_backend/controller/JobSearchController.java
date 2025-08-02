package io.github.iamrushier.jobconnect_backend.controller;

import io.github.iamrushier.jobconnect_backend.dto.common.PagedResponse;
import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/jobs/search")
@RequiredArgsConstructor
public class JobSearchController {

    private final JobService jobService;

    @GetMapping
    public ResponseEntity<PagedResponse<JobResponse>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(jobService.searchJobs(keyword, location, pageable));
    }
}
