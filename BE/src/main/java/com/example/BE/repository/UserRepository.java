package com.example.BE.repository;

import com.example.BE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface  UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
}