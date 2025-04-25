package com.example.BE.controller;

import com.example.BE.dto.UserProfileResponse;
import com.example.BE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

//    @GetMapping("/me")
//    public ResponseEntity<UserProfileResponse> getCurrentUser(Authentication authentication) {
//        String email = authentication.getName(); // This will usually be the email (used as username in login)
//
//        return userRepository.findByEmail(email)
//                .map(user -> ResponseEntity.ok(new UserProfileResponse(user.getUsername(), user.getEmail())))
//                .orElse(ResponseEntity.notFound().build());
//    }
}
