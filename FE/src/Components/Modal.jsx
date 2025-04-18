import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const Modal = ({ isOpen, onClose, note, onSave, onDelete }) => {
  
  const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
    ],
  };
  const [editedNote, setEditedNote] = useState({ ...note });
  
  useEffect(() => {
    if (note) {
      setEditedNote({
        id: note.id,
        heading: note.heading,
        notes: note.notes,
        createdAt: note.createdAt,
      });
    }
  }, [note]);

  const handleSave = () => {
    onSave(editedNote);
    onClose();
  };

  const handleDelete = () => {
    onDelete(editedNote.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Heading</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={editedNote.heading}
            onChange={(e) => setEditedNote({ ...editedNote, heading: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Notes</label>
          <ReactQuill
            value={editedNote.notes}
            onChange={(value) => setEditedNote({ ...editedNote, notes: value })}
            theme="snow"
            modules={modules}
            className="bg-white h-[200px] overflow-y-auto"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
          <div>
            <button
              className="bg-gray-300 text-black px-6 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
