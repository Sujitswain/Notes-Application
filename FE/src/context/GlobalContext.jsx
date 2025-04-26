import React, { createContext, useContext, useState, useMemo } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export const GlobalProvider = ({ children }) => {

    const details = [
      {
        id: 1,
        heading: "Taking Notes for ReactJS", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdaszbdfjahdfjkshdfjkhsjkfhsjkfhsjdkfhskjskjdfhsjdkhfsjkdhfkjsdhfkjsfhjskhfjksdhfjksdhfjksdhfjkdshfjkshdfjkhsdfjkhsdjkfhsdjkfhsjdkfhkjsdfhkjsdfhjksdfhjkd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 2,
        heading: "Taking Notes for Java", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: true,
        addedImages: []
      },
      {
        id: 3,
        heading: "Taking Notes for JavaScript", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 4,
        heading: "Taking Notes for Python", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 5,
        heading: "Taking Notes for MySQL", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: true,
        addedImages: []
      },
      {
        id: 6,
        heading: "Taking Notes for Docker", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 7,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 8,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 9,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 10,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 11,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 12,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
      {
        id: 13,
        heading: "Taking Notes for Kubernetes", 
        notes: "sdjahsdjhajdhajdshjashdjhadjhasjdhajsdhhhhhhhhhasadasasdadasdasddddddddddddddddddddddddddddddddddddddddddadadasdas\
        adasdadasdasdadasdasdadadasdasdasdasdasdasdasdasdadfwfeadsfsdasdasdasdasdadadasdasd",
        createdAt: "18-04-2025 14:30 PM",
        isFavorite: false,
        addedImages: []
      },
    ]
    
    const [notes, setNotes] = useState(() => [...details].sort((a, b) => b.isFavorite - a.isFavorite));
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNoteIds, setSelectedNoteIds] = useState([]);
    const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const toggleFavorite = (id) => {
        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
        );
        updatedNotes.sort((a, b) => b.isFavorite - a.isFavorite);
        setNotes(updatedNotes);
    };

    const handleSaveNote = (updatedNote) => {
        console.log(updatedNote)
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
            )
        );
    };

    const handleAddNote = () => {
        const newNote = {
            id: Date.now(),
            heading: "New Note",
            notes: "",
            createdAt: new Date().toLocaleString(),
        };
        setNotes([newNote, ...notes]);
        openModal(newNote);
    };
    
    const handleDeleteNote = (noteId) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };  

    const toggleMultiDeleteMode = () => {
        setIsMultiDeleteMode((prev) => !prev);
        setSelectedNoteIds([]);
    };

    const toggleSelectNote = (noteId) => {
        setSelectedNoteIds((prev) =>
            prev.includes(noteId)
            ? prev.filter((id) => id !== noteId)
            : [...prev, noteId]
        );
    };
    
    const handleMultiDelete = () => {
        setNotes((prevNotes) => prevNotes.filter((note) => !selectedNoteIds.includes(note.id)));
        setSelectedNoteIds([]);
        setIsMultiDeleteMode(false);
    };

    return (
        <GlobalContext.Provider
            value={{
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