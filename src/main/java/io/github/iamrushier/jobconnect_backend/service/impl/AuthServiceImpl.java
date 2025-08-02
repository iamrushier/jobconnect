package io.github.iamrushier.jobconnect_backend.service.impl;

import io.github.iamrushier.jobconnect_backend.dto.auth.AuthResponse;
import io.github.iamrushier.jobconnect_backend.dto.auth.LoginRequest;
import io.github.iamrushier.jobconnect_backend.dto.auth.RegisterRequest;
import io.github.iamrushier.jobconnect_backend.model.User;
import io.github.iamrushier.jobconnect_backend.repository.UserRepository;
import io.github.iamrushier.jobconnect_backend.security.CustomUserDetails;
import io.github.iamrushier.jobconnect_backend.security.JwtUtil;
import io.github.iamrushier.jobconnect_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        var user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        userRepository.save(user);

        var userDetails = new CustomUserDetails(user);
        var jwtToken = jwtUtil.generateToken(userDetails);
        var refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        var userDetails = new CustomUserDetails(user);
        var jwtToken = jwtUtil.generateToken(userDetails);
        var refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();
    }
}
