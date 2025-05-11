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

  const [email, setEmail] = useState(null);  // Registration email (used for OTP verification)

  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({});

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false); 
      }, 2000); 
    }
  }, [showToast]);

  /**
   * If the user login in with userName
   * and password.
   */
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8080/api/notes`, { 
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

  /**
   * User has logged in (token in LS) and if he 
   * refreshes the page the toke is again send
   * to be and validated if yes then the dashboard is loaded...
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      axios.get("http://localhost:8080/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Token is invalid or expired:", error);
        localStorage.removeItem("token");
        setUser(null);
      });
    }
  }, []);

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

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/api/notes/${id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      const updatedNote = response.data;
  
      const updatedNotes = notes.map((note) =>
        note.noteId === id ? updatedNote : note
      );
      updatedNotes.sort((a, b) => b.isFavorite - a.isFavorite);
      setNotes(updatedNotes);

      setToastConfig({
        message: `${updatedNote.isFavorite ? "Like" : "Not Like"} ${updatedNote.heading} ${updatedNote.isFavorite ? "🩷" : "🫤"}`,
        bgColor: "green",
        textColor: "#fff",
      });
      setShowToast(true);

    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to toggle favorite status. Please try again.');
    }
  };

  const handleSaveNote = (noteToSave) => {

    const token = localStorage.getItem("token");

    if (noteToSave.noteId) {
      // Note already has ID → Update (PUT)
      console.log("UPDATING.......")
      console.log(noteToSave)
      axios.put(`http://localhost:8080/api/notes`, 
        noteToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then(response => {
          const updatedNote = response.data;
          setNotes(prevNotes =>
            prevNotes.map(note =>
              note.noteId === updatedNote.noteId ? updatedNote : note
            )
          );
          
          setToastConfig({
            message: `${noteToSave.heading} have been updated.`,
            bgColor: "blue",
            textColor: "#fff",
          });
          setShowToast(true);

        })
        .catch(error => {
          console.error('Error updating note:', error);
        });
    } else {
      // No ID → New note → Create (POST)
      console.log("CREATING.......")
      console.log(noteToSave)
      axios.post('http://localhost:8080/api/note', noteToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then(response => {
          const newNote = response.data;
          setNotes(prevNotes => {
            const updatedNotes = [newNote, ...prevNotes];
            updatedNotes.sort((a, b) => b.isFavorite - a.isFavorite);
            return updatedNotes;
          });

          setToastConfig({
            message: `${noteToSave.heading} have been created.`,
            bgColor: "green",
            textColor: "#fff",
          });
          setShowToast(true);

        })
        .catch(error => {
          console.error('Error creating note:', error);
        });
    }
  };  

  const handleAddNote = () => {
    const newNote = {
      heading: "",
      notes: "",
      images: [],
      isFavorite: false
    };
    openModal(newNote);
  };
  
  const handleDeleteNote = async (noteId) => {
    try {

      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/notes/${noteId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      const deletedNote = notes.find((note) => note.noteId === noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note.noteId !== noteId));

      setToastConfig({
        message: `${deletedNote.heading} have been deleted.`,
        bgColor: "red",
        textColor: "#fff",
      });
      setShowToast(true);

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
        return prev.filter((id) => id !== noteId);
      } else {
        return [...prev, noteId];
      }
    });
  };
  
  const handleMultiDelete = async () => {
    try {

      const token = localStorage.getItem("token");

      await axios.post('http://localhost:8080/api/notes/bulk-delete', selectedNoteIds,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      setNotes((prevNotes) => prevNotes.filter((note) => !selectedNoteIds.includes(note.noteId)));
  
      setSelectedNoteIds([]);
      setIsMultiDeleteMode(false);

      setToastConfig({
        message: `${selectedNoteIds.length} notes have been deleted.`,
        bgColor: "red",
        textColor: "#fff",
      });
      setShowToast(true);

    } catch (error) {
      console.error('Error deleting notes:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);

    setToastConfig({
      message: "You have Sucessfully logged out..",
      bgColor: "green",
      textColor: "#fff",
    });
    setShowToast(true);

  };

  const handleCloseToast = () => {
    setShowToast(false); 
  };

  return (
    <GlobalContext.Provider
      value={{
        notes,
        showToast, 
        setShowToast,
        toastConfig, 
        setToastConfig,
        handleCloseToast,
        email, 
        setEmail,
        user,
        setUser,
        handleLogout,
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