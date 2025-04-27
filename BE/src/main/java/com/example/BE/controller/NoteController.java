package com.example.BE.controller;

import com.example.BE.dto.NoteRequest;
import com.example.BE.dto.NoteResponse;
import com.example.BE.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping("/note")
    public ResponseEntity<NoteResponse> createNote(@RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteService.createNote(noteRequest));
    }

    @GetMapping("/notes")
    public ResponseEntity<List<NoteResponse>> getNotes(@RequestParam(name = "userId", required = true) Long userId) {
        return ResponseEntity.ok(noteService.getNotes(userId));
    }

    @GetMapping("/note")
    public ResponseEntity<NoteResponse> getNoteById(@RequestParam(name = "id", required = true) Long id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<NoteResponse> updateNote(@PathVariable Long id, @RequestBody NoteRequest request) {
        return ResponseEntity.ok(noteService.updateNote(id, request));
    }

    @DeleteMapping("/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/notes/bulk-delete")
    public ResponseEntity<Void> deleteMultipleNotes(@RequestBody List<Long> ids) {
        noteService.deleteMultipleNotes(ids);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/notes/{id}/favorite")
    public ResponseEntity<NoteResponse> toggleFavorite(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.toggleFavorite(id));
    }

    @DeleteMapping("/notes/{noteId}/images/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long noteId, @PathVariable Long imageId) {
        noteService.deleteImage(noteId, imageId);
        return ResponseEntity.noContent().build();
    }

}
