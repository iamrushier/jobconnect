package io.github.iamrushier.jobconnect_backend.dto.application;

import io.github.iamrushier.jobconnect_backend.model.enums.ApplicationStatus;
import lombok.Data;

@Data
public class UpdateApplicationStatusRequest {
    private ApplicationStatus status;
}
