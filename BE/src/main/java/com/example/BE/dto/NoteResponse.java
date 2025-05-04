package com.example.BE.dto;

import com.example.BE.entity.NoteImage;
import lombok.Data;

import java.util.List;

@Data
public class NoteResponse {
    private Long noteId;
    private String heading;
    private String notes;
    private List<NoteImageResponse> images;
    private Boolean isFavorite;
}