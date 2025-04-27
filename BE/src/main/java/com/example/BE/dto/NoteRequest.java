package com.example.BE.dto;

import com.example.BE.entity.NoteImage;
import lombok.Data;

import java.util.List;

@Data
public class NoteRequest {
    private Long noteId;
    private Long userId;
    private String heading;
    private String notes;
    private List<NoteImageRequest> images;
    private Boolean isFavorite;
}