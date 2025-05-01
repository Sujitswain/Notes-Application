package com.example.BE.service.Impl;

import com.example.BE.entity.User;
import com.example.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void registerUser(String username, String email, String password) {
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
    }

    private String generateOtp() {
        return String.valueOf(new Random().nextInt(90000) + 10000);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getOtpCode().equals(otp) && LocalDateTime.now().isBefore(user.getOtpExpiry())) {
                user.setVerified(true);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}
