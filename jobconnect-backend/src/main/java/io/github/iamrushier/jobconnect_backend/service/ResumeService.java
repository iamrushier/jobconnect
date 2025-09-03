package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.model.Resume;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {
    Resume storeFile(MultipartFile file, String username);
    Resource loadFileAsResource(String filename);
    Resume getResumeByUsername(String username);
    void deleteResumeByUsername(String username);
}