package com.example.BE.repository;

import com.example.BE.entity.NoteImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteImageRepository extends JpaRepository<NoteImage, Long> {
    List<NoteImage> findByNoteId(Long noteId);
}
