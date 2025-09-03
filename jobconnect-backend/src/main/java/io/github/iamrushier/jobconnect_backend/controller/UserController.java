package io.github.iamrushier.jobconnect_backend.controller;

import io.github.iamrushier.jobconnect_backend.dto.user.UserResponse;
import io.github.iamrushier.jobconnect_backend.dto.user.UserUpdateRequest;
import io.github.iamrushier.jobconnect_backend.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "User Profile APIs")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> myDetails(
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // subject/username from JWT
        UserResponse userResponse = userService.getUserByUsername(username);
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateMyDetails(@Valid @RequestBody UserUpdateRequest userUpdateRequest) {
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String oldUsername=authentication.getName();
        if(userUpdateRequest.getUsername().equals(oldUsername)){
            return ResponseEntity.badRequest().build();
        }
        userService.updateUsername(oldUsername,userUpdateRequest.getUsername());
        UserResponse userResponse = userService.getUserByUsername(userUpdateRequest.getUsername());
        return ResponseEntity.ok(userResponse);
    }
}
