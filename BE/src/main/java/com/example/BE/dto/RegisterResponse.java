package com.example.BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String message;
    private boolean isNewUser;
    private boolean otpResent;
}
