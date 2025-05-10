package com.example.BE.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException ex) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", ex.getStatusCode());
        error.put("error", HttpStatus.valueOf(ex.getStatusCode()).getReasonPhrase());
        error.put("message", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.valueOf(ex.getStatusCode()));
    }
}

