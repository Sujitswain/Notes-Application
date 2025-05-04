package com.example.BE.controller;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.entity.User;
import com.example.BE.repository.UserRepository;
import com.example.BE.service.NoteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final UserRepository userRepository;

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @PostMapping("/note")
    public ResponseEntity<NoteResponse> createNote(@RequestBody NoteRequest noteRequest, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(noteService.createNote(noteRequest, user));
    }

    @GetMapping("/notes")
    public ResponseEntity<List<NoteResponse>> getNotes(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(noteService.getNotes(user.getId()));
    }

    @GetMapping("/note")
    public ResponseEntity<NoteResponse> getNoteById(@RequestParam(name = "id", required = true) Long id, Authentication authentication) throws AccessDeniedException {
        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(noteService.getNoteById(id, user));
    }

    @PutMapping("/notes")
    public ResponseEntity<NoteResponse> updateNote(@RequestBody NoteRequest request, Authentication authentication) throws AccessDeniedException {
        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(noteService.updateNote(request, user));
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id, Authentication authentication) throws AccessDeniedException {
        User user = getAuthenticatedUser(authentication);

        noteService.deleteNote(id, user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/notes/bulk-delete")
    public ResponseEntity<Void> deleteMultipleNotes(@RequestBody List<Long> ids, Authentication authentication) throws AccessDeniedException {
        User user = getAuthenticatedUser(authentication);

        noteService.deleteMultipleNotes(ids, user);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/notes/{id}/favorite")
    public ResponseEntity<NoteResponse> toggleFavorite(@PathVariable Long id, Authentication authentication) throws AccessDeniedException {
        User user = getAuthenticatedUser(authentication);

        return ResponseEntity.ok(noteService.toggleFavorite(id, user));
    }

    @DeleteMapping("/notes/{noteId}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long noteId, @PathVariable String imageId, Authentication authentication) throws AccessDeniedException {
        User user = getAuthenticatedUser(authentication);

        noteService.deleteImage(noteId, imageId, user);
        return ResponseEntity.noContent().build();
    }

}
