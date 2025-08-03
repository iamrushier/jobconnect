package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.dto.job.JobRequest;
import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.model.Job;
import io.github.iamrushier.jobconnect_backend.model.User;
import io.github.iamrushier.jobconnect_backend.repository.JobRepository;
import io.github.iamrushier.jobconnect_backend.repository.UserRepository;
import io.github.iamrushier.jobconnect_backend.service.impl.JobServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private JobServiceImpl jobService;

    @Test
    public void testCreateJob() {
        JobRequest jobRequest = new JobRequest("Test Job", "Test Description", "Test Location", BigDecimal.valueOf(300000.0),BigDecimal.valueOf(700000.0));
        User user = new User();
        user.setUsername("testemployer");

        when(userRepository.findByUsername("testemployer")).thenReturn(Optional.of(user));
        when(jobRepository.save(any(Job.class))).thenReturn(new Job());
        when(modelMapper.map(any(Job.class), any())).thenReturn(new JobResponse());

        JobResponse jobResponse = jobService.createJob(jobRequest, "testemployer");

        assertNotNull(jobResponse);
    }
}
