package com.example.BE.mapper;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.Note;
import com.example.BE.entity.NoteImage;
import com.example.BE.entity.User;

import java.util.List;
import java.util.stream.Collectors;

public class NoteMapper {
    public static Note toEntity(NoteRequest request, User user) {
        Note note = Note.builder()
                .heading(request.getHeading())
                .notes(request.getNotes())
                .isFavorite(request.getIsFavorite() != null && request.getIsFavorite())
                .user(user)
                .build();

        // Map base64 images to NoteImage entity
        if (request.getBase64Images() != null && !request.getBase64Images().isEmpty()) {
            List<NoteImage> images = request.getBase64Images().stream()

                    .map(base64 -> NoteImage.builder()
                            .imageData(base64)
                            .note(note)  // back-reference
                            .build())
                    .collect(Collectors.toList());
            note.setImages(images);
        }
        return note;
    }

    public static NoteResponse toDto(Note note) {
        List<String> imageList = note.getImages() != null
                ? note.getImages().stream()
                .map(NoteImage::getImageData)
                .collect(Collectors.toList())
                : List.of();

        NoteResponse response = new NoteResponse();
        response.setUserId(note.getUser().getId());
        response.setHeading(note.getHeading());
        response.setNotes(note.getNotes());
        response.setImages(imageList);
        response.setIsFavorite(note.isFavorite());

        return response;
    }
}