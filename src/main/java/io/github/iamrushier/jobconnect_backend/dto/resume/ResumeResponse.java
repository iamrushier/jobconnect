package io.github.iamrushier.jobconnect_backend.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponse {
    private String filename;
    private String originalFilename;
    private String contentType;
    private Long size;
}
