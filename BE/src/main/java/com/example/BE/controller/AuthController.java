package com.example.BE.controller;

import com.example.BE.dto.*;
import com.example.BE.exception.CustomException;
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
import org.springframework.web.bind.annotation.*;

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
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            CustomUserDetails customUserDetails = (CustomUserDetails) customUserDetailsService.loadUserByUsername(request.getEmail());;
            final String jwt = jwtUtil.generateToken(
                    customUserDetails.getActualUsername(), customUserDetails.getEmail()
            );

            return ResponseEntity.ok(new AuthResponse(jwt, customUserDetails.getEmail(), customUserDetails.getActualUsername()));
        } catch (Exception e) {
            throw new CustomException("Invalid credentials", HttpStatus.UNAUTHORIZED.value());
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String email = jwtUtil.extractUsername(token);
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

            if (!jwtUtil.isTokenValid(token, userDetails)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            CustomUserDetails customUser = (CustomUserDetails) userDetails;
            return ResponseEntity.ok(new AuthResponse(token, customUser.getEmail(), customUser.getActualUsername()));
        }
        catch (Exception e) {
            throw new CustomException("Invalid token or Expired", HttpStatus.UNAUTHORIZED.value());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        RegisterResponse response = userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationRequest request) {
        AuthResponse response = userService.verifyOtp(request.getEmail(), request.getOtp());
        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            throw new CustomException("Invalid or Expired OTP", HttpStatus.BAD_REQUEST.value());
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> resendOtp(@RequestBody ResendOtpRequestDTO request) {
        userService.resendOtp(request.getEmail());
        return ResponseEntity.ok("OTP resent successfully.");
    }

}
