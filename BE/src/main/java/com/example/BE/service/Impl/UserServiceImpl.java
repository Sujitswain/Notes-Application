package com.example.BE.service.Impl;

import com.example.BE.dto.AuthResponse;
import com.example.BE.dto.RegisterResponse;
import com.example.BE.entity.User;
import com.example.BE.exception.CustomException;
import com.example.BE.repository.UserRepository;
import com.example.BE.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailServiceImpl emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    public RegisterResponse registerUser(String username, String email, String password) {

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            if (user.isVerified()) {
                throw new CustomException("Email is already registered and verified.", HttpStatus.CONFLICT.value());
            }
            else {
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode(password));
                user.setOtpCode(generateOtp());
                user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
                userRepository.save(user);

                emailService.sendOtpEmail(email, user.getOtpCode());

                return new RegisterResponse("OTP resent to email", false, true);
            }
        }

        String encodedPassword = passwordEncoder.encode(password);

        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encodedPassword);
        user.setOtpCode(otp);
        user.setOtpExpiry(expiry);
        user.setVerified(false);
        userRepository.save(user);

        emailService.sendOtpEmail(email, otp);

        return new RegisterResponse("OTP sent to email", true, false);
    }

    private String generateOtp() {
        return String.valueOf(new Random().nextInt(90000) + 10000);
    }

    public AuthResponse verifyOtp(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getOtpCode().equals(otp) && LocalDateTime.now().isBefore(user.getOtpExpiry())) {
                user.setVerified(true);
                userRepository.save(user);
                String token = jwtUtil.generateToken(user.getUsername(), user.getEmail());
                return new AuthResponse(token, user.getEmail(), user.getUsername());
            }
        }
        return null;
    }

    public void resendOtp(String email) {
        System.out.println("RESEND Email: " + email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException("Email not found", 404));

        if (user.isVerified()) {
            throw new CustomException("OTP already verified", 400);
        }

        String otp = generateOtp();
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendOtpEmail(email, otp);
    }
}
