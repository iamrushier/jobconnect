package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.dto.common.PagedResponse;
import io.github.iamrushier.jobconnect_backend.dto.job.JobRequest;
import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.dto.user.UserResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    UserResponse getUserByUsername(String username);
}
