package com.example.BE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResendOtpRequestDTO {
    private String email;
}
