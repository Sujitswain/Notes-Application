package com.example.BE.service;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;

import java.util.List;

public interface NoteService {

    NoteResponse createNote(NoteRequest noteRequest);
    List<NoteResponse> getNotes(Long userId);
    NoteResponse getNoteById(Long id);
    NoteResponse updateNote(Long id, NoteRequest noteRequest);
    void deleteNote(Long id);
    NoteResponse toggleFavorite(Long id);
    void deleteImage(Long noteId, Long imageId);
    void deleteMultipleNotes(List<Long> ids);
}
