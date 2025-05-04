package com.example.BE.service.Impl;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.Note;
import com.example.BE.entity.NoteImage;
import com.example.BE.entity.User;
import com.example.BE.mapper.NoteMapper;
import com.example.BE.repository.NoteImageRepository;
import com.example.BE.repository.NoteRepository;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.NoteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final NoteImageRepository noteImageRepository;

    private Note findNoteIfOwnedByUser(Long id, User user) throws AccessDeniedException {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You are not authorized to access this note.");
        }
        return note;
    }

    @Override
    public NoteResponse createNote(NoteRequest noteRequest, User user) {
        Note note = NoteMapper.toEntity(noteRequest, user);
        Note savedNote = noteRepository.save(note);

        return NoteMapper.toDto(savedNote);
    }

    @Override
    public List<NoteResponse> getNotes(Long userId) {
        List<Note> notes = noteRepository.findByUser_Id(userId);

        return notes.stream()
                .map(NoteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public NoteResponse getNoteById(Long id, User user) throws AccessDeniedException {
        Note note = findNoteIfOwnedByUser(id, user);

        return NoteMapper.toDto(note);
    }

    @Override
    public NoteResponse updateNote(NoteRequest request, User user) throws AccessDeniedException {
        Note note = findNoteIfOwnedByUser(request.getNoteId(), user);

        note.setHeading(request.getHeading());
        note.setNotes(request.getNotes());
        note.getImages().clear();

        if (request.getImages() != null && !request.getImages().isEmpty()) {
            List<NoteImage> images = request.getImages().stream()
                    .map(item -> NoteImage.builder()
                            .id(item.getId())
                            .base64(item.getBase64())
                            .note(note)
                            .build())
                    .toList();
            note.getImages().addAll(images);
        }

        Note updatedNode = noteRepository.save(note);
        return NoteMapper.toDto(updatedNode);
    }

    @Override
    public void deleteNote(Long id, User user) throws AccessDeniedException {
        Note note = findNoteIfOwnedByUser(id, user);

        noteRepository.deleteById(id);
    }

    @Override
    public NoteResponse toggleFavorite(Long id, User user) throws AccessDeniedException {
        Note note = findNoteIfOwnedByUser(id, user);
        note.setFavorite(!note.isFavorite());

        Note updatedNote = noteRepository.save(note);
        return NoteMapper.toDto(updatedNote);
    }

    @Override
    public void deleteImage(Long noteId, String imageId, User user) throws AccessDeniedException {
        Note note = findNoteIfOwnedByUser(noteId, user);

        NoteImage image = note.getImages().stream()
                .filter(img -> img.getId().equals(imageId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Image not found"));

        note.getImages().remove(image);
        noteImageRepository.delete(image);
        noteRepository.save(note);
    }

    @Override
    public void deleteMultipleNotes(List<Long> ids, User user) throws AccessDeniedException {
        List<Note> notes = noteRepository.findAllById(ids);

        if (notes.size() != ids.size())
            throw new EntityNotFoundException("One or more notes not found.");

        boolean allOwned = notes.stream().allMatch(n -> n.getUser().getId().equals(user.getId()));
        if (!allOwned)
            throw new AccessDeniedException("One or more notes do not belong to the user.");

        noteRepository.deleteAll(notes);
    }

}
