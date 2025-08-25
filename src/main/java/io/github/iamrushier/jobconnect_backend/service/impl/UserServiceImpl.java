package io.github.iamrushier.jobconnect_backend.service.impl;

import io.github.iamrushier.jobconnect_backend.dto.job.JobResponse;
import io.github.iamrushier.jobconnect_backend.dto.user.UserResponse;
import io.github.iamrushier.jobconnect_backend.exception.ResourceNotFoundException;
import io.github.iamrushier.jobconnect_backend.model.User;
import io.github.iamrushier.jobconnect_backend.repository.JobRepository;
import io.github.iamrushier.jobconnect_backend.repository.UserRepository;
import io.github.iamrushier.jobconnect_backend.service.AdminService;
import io.github.iamrushier.jobconnect_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return modelMapper.map(user, UserResponse.class);
    }
}
