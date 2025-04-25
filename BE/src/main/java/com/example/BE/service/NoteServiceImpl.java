package com.example.BE.service;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.Note;
import com.example.BE.entity.NoteImage;
import com.example.BE.entity.User;
import com.example.BE.mapper.NoteMapper;
import com.example.BE.repository.NoteImageRepository;
import com.example.BE.repository.NoteRepository;
import com.example.BE.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final NoteImageRepository noteImageRepository;

    @Override
    public NoteResponse createNote(NoteRequest noteRequest) {
        User user = userRepository.findById(noteRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Note note = NoteMapper.toEntity(noteRequest, user);
        Note savedNote = noteRepository.save(note);
        return NoteMapper.toDto(savedNote);
    }

    @Override
    public List<NoteResponse> getNotes(Long userId) {
        List<Note> notes = noteRepository.findByUser_Id(userId);

        // Convert to DTOs
        return notes.stream()
                .map(NoteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public NoteResponse getNoteById(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));

        // Convert Note entity to NoteResponse DTO
        return NoteMapper.toDto(note);
    }

    @Override
    public NoteResponse updateNote(Long id, NoteRequest request) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));
        note.setHeading(request.getHeading());
        note.setNotes(request.getNotes());
        note.setFavorite(request.getIsFavorite());

        // Optionally handle updating base64 images
        if (request.getBase64Images() != null && !request.getBase64Images().isEmpty()) {
            List<NoteImage> images = request.getBase64Images().stream()
                    .map(base64 -> NoteImage.builder()
                            .imageData(base64)
                            .note(note)
                            .build())
                    .collect(Collectors.toList());
            note.setImages(images);
        }

        Note updatedNote = noteRepository.save(note);
        return NoteMapper.toDto(updatedNote);
    }

    @Override
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    @Override
    public NoteResponse toggleFavorite(Long id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note not found"));
        note.setFavorite(!note.isFavorite());

        Note updatedNote = noteRepository.save(note);
        return NoteMapper.toDto(updatedNote);
    }
}
