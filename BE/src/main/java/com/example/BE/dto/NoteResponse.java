package com.example.BE.dto;

import lombok.Data;

import java.util.List;

@Data
public class NoteResponse {
    private Long userId;
    private String heading;
    private String notes;
    private List<String> images;
    private Boolean isFavorite;
}