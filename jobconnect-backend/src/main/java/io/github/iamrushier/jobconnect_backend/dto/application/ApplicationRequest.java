package io.github.iamrushier.jobconnect_backend.dto.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {
    private Long jobId;
    private Long resumeId;
}
