package com.example.BE.security;

import com.example.BE.dto.CustomUserDetails;
import com.example.BE.entity.User;
import com.example.BE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found Exception"));

        if (!user.isVerified()) {
            throw new UsernameNotFoundException("User not verified. Please verify your email.");
        }

        return new CustomUserDetails(user);
    }
}
