package com.example.BE.service;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.Note;
import com.example.BE.repository.NoteImageRepository;
import com.example.BE.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final NoteImageRepository noteImageRepository;

    @Override
    public NoteResponse createNote(NoteRequest noteRequest) {
        return null;
    }

    @Override
    public List<NoteResponse> getNotes() {
        return List.of();
    }

    @Override
    public NoteResponse getNoteById(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));

        /**
         * Mapper to convert entity to dta
         */
        return null;
    }

    @Override
    public NoteResponse updateNote(Long id, NoteRequest request) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));
        note.setHeading(request.getHeading());
        note.setNotes(request.getNotes());
        note.setFavorite(request.getIsFavorite());

        /**
         * Mapper to convert entity to dto
         */
        return null;
    }

    @Override
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NoteResponse toggleFavorite(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));
        note.setFavorite(!note.isFavorite());

        /**
         * Mapper required to convert entity to dto
         */
        return null;
        // return noteRepository.save(note);
    }
}
