import React, { useState } from 'react'
import NoteBlock from './NoteBlock';
import Modal from './Modal';
import Toast from "./Toast";

import { useGlobalContext } from '../context/GlobalContext';


const Dashboard = () => {
  
  const {
    notes,
    user,
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
    setSearchTerm,
    showToast,
    toastConfig,
    handleCloseToast
  } = useGlobalContext();
  
  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-100">
      <div className="w-full max-w-[1200px] min-w-[320px] flex flex-col bg-white shadow-xl border border-gray-300">
        
        {/* Toast Message */}
        {showToast && <Toast toastConfig={toastConfig} onClose={handleCloseToast} />}

        {/* Top Bar */}
        <div className="h-[64px] px-4 flex items-center justify-between border-b border-gray-300 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3 w-full max-w-[70%]">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg border-2 border-gray-500">{(user?.username[0]+"").toUpperCase()}</div>
            <input
              type="text"
              placeholder="Search Notes"
              className="flex-grow h-9 max-w-[50%] min-w-[200px] px-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 hover:ring-2 hover:ring-blue-400 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-100 text-red-700 font-semibold px-6 py-1 rounded transition hover:bg-red-200 hover:text-red-800 shadow hover:shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Greeting and Add Note Button */}
        <div className="px-4 py-4 flex justify-between items-start sm:items-center">
          <p className="text-2xl font-bold text-blue-600">
            Hey, <span className="text-black">{(user?.username[0]+"").toUpperCase()}{(user?.username+"").slice(1, (user?.username+"").length)}</span>
          </p>
          <div className="flex items-center gap-3">
            {isMultiDeleteMode ? (
              <>
                <button
                  onClick={handleMultiDelete}
                  disabled={selectedNoteIds.length === 0}
                  className={`text-sm font-semibold w-[55px] h-[30px] rounded-md transition shadow-sm ${
                    selectedNoteIds.length > 0
                      ? 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  🗑️ ({selectedNoteIds.length})
                </button>

                <button
                  className="text-sm font-semibold w-[30px] h-[30px] bg-red-200 text-white rounded-full hover:bg-gray-300 transition shadow-sm"
                  onClick={toggleMultiDeleteMode}
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-sm font-semibold w-[30px] h-[30px] bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-sm hover:shadow-md"
                  onClick={toggleMultiDeleteMode}
                >
                  🗑️
                </button>

                <button
                  className="bg-blue-500 pb-[5px] h-[30px] w-[30px] text-white font-bold text-[25px] rounded-full 
                            hover:bg-blue-600 transition flex items-center justify-center shadow-md hover:scale-110"
                  onClick={handleAddNote}
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center py-1 gap-2 px-4 pb-4 overflow-y-auto h-[calc(100vh-128px)] scrollbar-hide cursor-pointer">
          {notes.length > 0 ? (
            filteredNotes.map((item) => (
              <NoteBlock
                key={item.noteId}
                heading={highlightText(item.heading, searchTerm)}
                notes={item.notes}
                createdAt={item.createdAt}
                onClick={() => openModal(item)}
                showCheckbox={isMultiDeleteMode}
                isSelected={selectedNoteIds.includes(item.noteId)}
                onSelect={() => toggleSelectNote(item.noteId)}
                onToggleFavorite={() => toggleFavorite(item.noteId)}
                isFavorite={item.isFavorite}
              />
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center bg-gray-50 text-gray-600 rounded-2xl p-8 mt-12 shadow-inner border border-dashed border-gray-300 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-violet-400 mb-4 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h3m2 4H5a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-2xl font-medium">Start your first note</p>
              <p onClick={handleAddNote} className="text-sm text-gray-400 mt-1">Click here</p>
            </div>
          )}
        </div>

      </div>
      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          note={selectedNote}
          onSave={handleSaveNote}
          onDelete={handleDeleteNote}
        />
      )}

    </div>
  );
};

export default Dashboard;