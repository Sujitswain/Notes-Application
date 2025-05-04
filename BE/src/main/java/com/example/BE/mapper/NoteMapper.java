package com.example.BE.mapper;

import com.example.BE.dto.NoteImageResponse;
import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.Note;
import com.example.BE.entity.NoteImage;
import com.example.BE.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class NoteMapper {
    public static Note toEntity(NoteRequest request, User user) {
        Note note = Note.builder()
                .heading(request.getHeading())
                .notes(request.getNotes())
                .user(user)
                .build();

        if (request.getImages() != null && !request.getImages().isEmpty()) {
            List<NoteImage> images = request.getImages().stream()
                    .map(item -> NoteImage.builder()
                            .id(item.getId())
                            .base64(item.getBase64())
                            .note(note)
                            .build())
                    .collect(Collectors.toList());
            note.setImages(images);
        }

        return note;
    }

    public static NoteResponse toDto(Note note) {
        List<NoteImageResponse> imageList = note.getImages() != null
                ? note.getImages().stream()
                .map(image -> NoteImageResponse.builder()
                        .id(image.getId())
                        .base64(image.getBase64())
                        .build())
                .collect(Collectors.toList())
                : List.of();

        NoteResponse response = new NoteResponse();
        response.setNoteId(note.getId());
        response.setHeading(note.getHeading());
        response.setNotes(note.getNotes());
        response.setImages(imageList);
        response.setIsFavorite(note.isFavorite());

        return response;
    }
}