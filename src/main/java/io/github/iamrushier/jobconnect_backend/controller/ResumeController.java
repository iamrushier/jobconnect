package io.github.iamrushier.jobconnect_backend.controller;

import io.github.iamrushier.jobconnect_backend.dto.resume.ResumeResponse;
import io.github.iamrushier.jobconnect_backend.model.Resume;
import io.github.iamrushier.jobconnect_backend.service.ApplicationService;
import io.github.iamrushier.jobconnect_backend.service.ResumeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
@Tag(name = "Resume APIs", description = "Resume document related actions")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    @PreAuthorize("hasAuthority('JOB_SEEKER')")
    public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal UserDetails userDetails) {
        Resume resume = resumeService.storeFile(file, userDetails.getUsername());

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/v1/resumes/download/")
                .path(resume.getFilename())
                .toUriString();

        return ResponseEntity.ok("Resume uploaded successfully. Download URL: " + fileDownloadUri);
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String filename, HttpServletRequest request) {
        Resource resource = resumeService.loadFileAsResource(filename);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            // logger.info("Could not determine file type.");
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/mine")
    @PreAuthorize("hasAuthority('JOB_SEEKER')")
    public ResponseEntity<ResumeResponse> getMyResume(@AuthenticationPrincipal UserDetails userDetails) {
        Resume resume = resumeService.getResumeByUsername(userDetails.getUsername());
        ResumeResponse resumeResponse = new ResumeResponse(
                resume.getId(),
                resume.getFilename(),
                resume.getOriginalFilename(),
                resume.getContentType(),
                resume.getSize()
        );
        return ResponseEntity.ok(resumeResponse);
    }

    @DeleteMapping("/mine")
    @PreAuthorize("hasAuthority('JOB_SEEKER')")
    public ResponseEntity<Void> deleteMyResume(@AuthenticationPrincipal UserDetails userDetails) {
        resumeService.deleteResumeByUsername(userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}