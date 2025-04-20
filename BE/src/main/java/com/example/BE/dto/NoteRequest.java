package com.example.BE.dto;

import lombok.Data;

import java.util.List;

@Data
public class NoteRequest {
    private Long userId;
    private String heading;
    private String notes;
    private List<String> base64Images;
    private Boolean isFavorite;
}