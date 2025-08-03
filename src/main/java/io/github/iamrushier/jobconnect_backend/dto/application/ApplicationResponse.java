package io.github.iamrushier.jobconnect_backend.dto.application;

import io.github.iamrushier.jobconnect_backend.model.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private String jobTitle;
    private Long userId;
    private ApplicationStatus status;
    private LocalDateTime createdAt;
//    private String username;
//    private LocalDateTime appliedAt;
}
