import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState([]);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    console.log("Token: " + token);

    axios.get(`http://localhost:8080/api/notes`, { 
      params: { userId: 1 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    })
      .then(response => {
        const sortedNotes = [...response.data].sort((a, b) => b.isFavorite - a.isFavorite);
        setNotes(sortedNotes);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, [user]);

  const filteredNotes = useMemo(() => {
    return searchTerm.trim()
      ? notes.filter((note) =>
            note.heading.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : notes;
  }, [searchTerm, notes]);

  const highlightText = (heading, term) => {
    if (!term) return heading;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = heading.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
      <span key={index} style={{ color: 'red', fontWeight: 'bold' }}>
          {part}
      </span>
      ) : (
      part
      )
    );
  };

  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const toggleFavorite = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/notes/${id}/favorite`);
      const updatedNote = response.data;
  
      const updatedNotes = notes.map((note) =>
        note.noteId === id ? updatedNote : note
      );
      updatedNotes.sort((a, b) => b.isFavorite - a.isFavorite);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to toggle favorite status. Please try again.');
    }
  };

  const handleSaveNote = (noteToSave) => {
    if (noteToSave.noteId) {
      // Note already has ID → Update (PUT)
      console.log("UPDATING.......")
      console.log(noteToSave)
      axios.put(`http://localhost:8080/api/notes/${noteToSave.noteId}`, noteToSave)
        .then(response => {
          const updatedNote = response.data;
          setNotes(prevNotes =>
            prevNotes.map(note =>
              note.noteId === updatedNote.noteId ? updatedNote : note
            )
          );
        })
        .catch(error => {
          console.error('Error updating note:', error);
        });
    } else {
      // No ID → New note → Create (POST)
      console.log("CREATING.......")
      console.log(noteToSave)
      axios.post('http://localhost:8080/api/note', noteToSave)
        .then(response => {
          const newNote = response.data;
          setNotes(prevNotes => [newNote, ...prevNotes]);
        })
        .catch(error => {
          console.error('Error creating note:', error);
        });
    }
  };  

  const handleAddNote = () => {
    const newNote = {
      userId: 1,
      heading: "",
      notes: "",
      images: [],
      isFavorite: false
    };
    openModal(newNote);
  };
  
  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete the note. Please try again.');
    }
  };
  
  const toggleMultiDeleteMode = () => {
    setIsMultiDeleteMode((prev) => !prev);
    setSelectedNoteIds([]);
  };

  const toggleSelectNote = (noteId) => {
    setSelectedNoteIds((prev) => {
      if (prev.includes(noteId)) {
        // Deselect the note if it is already selected
        return prev.filter((id) => id !== noteId);
      } else {
        // Select the note if it is not already selected
        return [...prev, noteId];
      }
    });
  };
  
  const handleMultiDelete = async () => {
    try {
      await axios.post('http://localhost:8080/api/notes/bulk-delete', selectedNoteIds);
      setNotes((prevNotes) => prevNotes.filter((note) => !selectedNoteIds.includes(note.noteId)));
  
      setSelectedNoteIds([]);
      setIsMultiDeleteMode(false);
    } catch (error) {
      console.error('Error deleting notes:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        selectedNote,
        isModalOpen,
        selectedNoteIds,
        isMultiDeleteMode,
        searchTerm,
        filteredNotes,
        highlightText,
        openModal,
        closeModal,
        toggleFavorite,
        handleSaveNote,
        handleAddNote,
        handleDeleteNote,
        toggleMultiDeleteMode,
        toggleSelectNote,
        handleMultiDelete,
        setSearchTerm
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
    
}