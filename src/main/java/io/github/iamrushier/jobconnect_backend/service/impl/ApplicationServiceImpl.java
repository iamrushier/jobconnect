package io.github.iamrushier.jobconnect_backend.service.impl;

import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationRequest;
import io.github.iamrushier.jobconnect_backend.dto.application.ApplicationResponse;
import io.github.iamrushier.jobconnect_backend.exception.ResourceNotFoundException;
import io.github.iamrushier.jobconnect_backend.exception.UnauthorizedException;
import io.github.iamrushier.jobconnect_backend.model.*;
import io.github.iamrushier.jobconnect_backend.model.enums.ApplicationStatus;
import io.github.iamrushier.jobconnect_backend.repository.ApplicationRepository;
import io.github.iamrushier.jobconnect_backend.repository.JobRepository;
import io.github.iamrushier.jobconnect_backend.repository.ResumeRepository;
import io.github.iamrushier.jobconnect_backend.repository.UserRepository;
import io.github.iamrushier.jobconnect_backend.service.ApplicationService;
import io.github.iamrushier.jobconnect_backend.service.EmailService;
import io.github.iamrushier.jobconnect_backend.util.EmailTemplateUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ResumeRepository resumeRepository;
    private final ModelMapper modelMapper;
    private final EmailService emailService;

    @Override
    public ApplicationResponse applyForJob(ApplicationRequest applicationRequest, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Job job = jobRepository.findById(applicationRequest.getJobId())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        Resume resume = resumeRepository.findById(applicationRequest.getResumeId())
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

        if (!resume.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedException("You can only use your own resume");
        }

        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        application.setResume(resume);
        application.setStatus(ApplicationStatus.PENDING);

        Application savedApplication = applicationRepository.save(application);

//        emailService.sendEmail(user.getEmail(), "Job Application Received", EmailTemplateUtil.buildJobApplicationEmail(user, job));
        System.out.println("Mail sent: Job Application Received");
        return modelMapper.map(savedApplication, ApplicationResponse.class);
    }

    @Override
    public List<ApplicationResponse> getMyApplications(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return applicationRepository.findByUser(user).stream()
                .map(application -> modelMapper.map(application, ApplicationResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationResponse> getApplicationsForJob(Long jobId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (!job.getEmployer().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not authorized to view applications for this job");
        }

        return applicationRepository.findByJob(job).stream()
                .map(application -> modelMapper.map(application, ApplicationResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean existsByUser(User user) {
        return applicationRepository.existsByUser(user);
    }
}
