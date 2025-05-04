package com.example.BE.controller;

import com.example.BE.dto.*;
import com.example.BE.security.CustomUserDetailsService;
import com.example.BE.security.JWTUtil;
import com.example.BE.service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {

            System.out.println("Trying login for email: " + request.getEmail());
            System.out.println("Raw password: " + request.getPassword());

            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            final UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getEmail());
            CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
            final String jwt = jwtUtil.generateToken(
                    customUserDetails.getActualUsername(), customUserDetails.getEmail()
            );

            return ResponseEntity.ok(new AuthResponse(jwt, customUserDetails.getEmail(), customUserDetails.getActualUsername()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok("OTP sent to email. Please verify.");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest request) {
        boolean verified = userService.verifyOtp(request.getEmail(), request.getOtp());
        if (verified) {
            return ResponseEntity.ok("OTP verified successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP.");
        }
    }
}
