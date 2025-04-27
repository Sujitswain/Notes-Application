package com.example.BE.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NoteImageResponse {
    private String id;
    private String base64;
}
