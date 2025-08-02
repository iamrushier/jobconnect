package io.github.iamrushier.jobconnect_backend.service.impl;

import io.github.iamrushier.jobconnect_backend.config.FileStorageProperties;
import io.github.iamrushier.jobconnect_backend.exception.FileStorageException;
import io.github.iamrushier.jobconnect_backend.exception.ResourceNotFoundException;
import io.github.iamrushier.jobconnect_backend.model.Resume;
import io.github.iamrushier.jobconnect_backend.model.User;
import io.github.iamrushier.jobconnect_backend.repository.ResumeRepository;
import io.github.iamrushier.jobconnect_backend.repository.UserRepository;
import io.github.iamrushier.jobconnect_backend.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final Path fileStorageLocation;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @Autowired
    public ResumeServiceImpl(FileStorageProperties fileStorageProperties, ResumeRepository resumeRepository, UserRepository userRepository) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public Resume storeFile(MultipartFile file, String username) {
        // Normalize file name
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (originalFilename.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + originalFilename);
            }

            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

            String fileName = user.getId() + "_" + originalFilename;

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            Resume resume = new Resume();
            resume.setUser(user);
            resume.setFilename(fileName);
            resume.setOriginalFilename(originalFilename);
            resume.setContentType(file.getContentType());
            resume.setSize(file.getSize());

            return resumeRepository.save(resume);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + originalFilename + ". Please try again!", ex);
        }
    }

    @Override
    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found " + filename);
            }
        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("File not found " + filename+" : "+ex);
        }
    }
}
