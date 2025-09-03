package io.github.iamrushier.jobconnect_backend.service.impl;

import io.github.iamrushier.jobconnect_backend.dto.common.PagedResponse;
import io.github.iamrushier.jobconnect_backend.dto.job.JobRequest;
import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.exception.ResourceNotFoundException;
import io.github.iamrushier.jobconnect_backend.exception.UnauthorizedException;
import io.github.iamrushier.jobconnect_backend.model.Job;
import io.github.iamrushier.jobconnect_backend.model.User;
import io.github.iamrushier.jobconnect_backend.repository.JobRepository;
import io.github.iamrushier.jobconnect_backend.repository.UserRepository;
import io.github.iamrushier.jobconnect_backend.service.JobService;
import io.github.iamrushier.jobconnect_backend.util.SearchSpecification;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final SearchSpecification searchSpecification;

    @Override
    public PagedResponse<JobResponse> searchJobs(String keyword, String location, Pageable pageable) {
        Specification<Job> spec = searchSpecification.findByCriteria(keyword, location);
        Page<Job> jobsPage = jobRepository.findAll(spec, pageable);

        List<JobResponse> jobResponses = jobsPage.getContent().stream()
                .map(job -> modelMapper.map(job, JobResponse.class))
                .collect(Collectors.toList());

        return new PagedResponse<>(
                jobResponses,
                jobsPage.getNumber(),
                jobsPage.getSize(),
                jobsPage.getTotalElements(),
                jobsPage.getTotalPages(),
                jobsPage.isLast()
        );
    }

    @Override
    public JobResponse createJob(JobRequest jobRequest, String username) {
        User employer = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        Job job = modelMapper.map(jobRequest, Job.class);
        job.setEmployer(employer);

        Job savedJob = jobRepository.save(job);
        return modelMapper.map(savedJob, JobResponse.class);
    }

    @Override
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
        return modelMapper.map(job, JobResponse.class);
    }

    @Override
    public List<JobResponse> getAllJobsByEmployer(String username) {
        User employer = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + username));

        return jobRepository.findAll().stream()
                .filter(job -> job.getEmployer().equals(employer))
                .map(job -> modelMapper.map(job, JobResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public JobResponse updateJob(Long id, JobRequest jobRequest, String username) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        if (!job.getEmployer().getUsername().equals(username)) {
            throw new UnauthorizedException("You are not authorized to update this job.");
        }

        modelMapper.map(jobRequest, job);
        Job updatedJob = jobRepository.save(job);
        return modelMapper.map(updatedJob, JobResponse.class);
    }

    @Override
    public void deleteJob(Long id, String username) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        if (!job.getEmployer().getUsername().equals(username)) {
            throw new UnauthorizedException("You are not authorized to delete this job.");
        }

        jobRepository.delete(job);
    }
}
