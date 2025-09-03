package io.github.iamrushier.jobconnect_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.iamrushier.jobconnect_backend.dto.auth.LoginRequest;
import io.github.iamrushier.jobconnect_backend.dto.auth.RegisterRequest;
import io.github.iamrushier.jobconnect_backend.model.enums.Role;
import io.github.iamrushier.jobconnect_backend.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testRegister() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("testuser", "password", "testuser@example.com", Role.JOB_SEEKER);

        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());
    }

    @Test
    public void testLogin() throws Exception {
        LoginRequest loginRequest = new LoginRequest("testuser", "password");

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());
    }
}
