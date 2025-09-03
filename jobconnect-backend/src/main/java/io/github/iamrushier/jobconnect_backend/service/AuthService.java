package io.github.iamrushier.jobconnect_backend.service;

import io.github.iamrushier.jobconnect_backend.dto.auth.AuthResponse;
import io.github.iamrushier.jobconnect_backend.dto.auth.LoginRequest;
import io.github.iamrushier.jobconnect_backend.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
