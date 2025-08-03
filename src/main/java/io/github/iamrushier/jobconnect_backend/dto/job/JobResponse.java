package io.github.iamrushier.jobconnect_backend.dto.job;

import io.github.iamrushier.jobconnect_backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {

    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long employerId;
}
