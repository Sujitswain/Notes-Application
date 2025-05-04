package com.example.BE.service;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.User;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface NoteService {

    NoteResponse createNote(NoteRequest noteRequest, User user);
    List<NoteResponse> getNotes(Long userId);
    NoteResponse getNoteById(Long id, User user) throws AccessDeniedException;
    NoteResponse updateNote(NoteRequest noteRequest, User user) throws AccessDeniedException;
    void deleteNote(Long id, User user) throws AccessDeniedException;
    NoteResponse toggleFavorite(Long id, User user) throws AccessDeniedException;
    void deleteImage(Long noteId, String imageId, User user) throws AccessDeniedException;
    void deleteMultipleNotes(List<Long> ids, User user) throws AccessDeniedException;
}
