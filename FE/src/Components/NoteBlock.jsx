import React from 'react';

const NoteBlock = ({ heading, notes, createdAt, onClick, showCheckbox, isSelected, onSelect, onToggleFavorite, isFavorite }) => {
  return (
    <div 
      onClick={onClick} 
      className="relative p-2 rounded-md shadow-md w-[320px] h-[190px] flex flex-col justify-between border border-blue-100 transition-all duration-200 hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        {showCheckbox && (
            <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 z-10 h-4 w-4 accent-blue-500"
            />
        )}
        <div className="relative">
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide pr-10 text-blue-500 font-bold text-lg">
            {heading}
          </div>
          <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {!showCheckbox && (
          <div 
            className="absolute top-2 right-2 z-10 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from triggering the onClick
              onToggleFavorite(); // Toggle the favorite status
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill={isFavorite ? "red" : "none"} 
              stroke="currentColor" 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              strokeWidth="0.4"
            >
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
        )}

        <div
            className="text-gray-800 text-[12px] whitespace-pre-wrap break-words overflow-hidden h-[110px] mt-1"
            dangerouslySetInnerHTML={{ __html: notes }}
        />
      </div>
      <p className="text-[10px] text-gray-500 absolute right-0 bottom-0 p-1">{createdAt}</p>
    </div>
  );
};

export default NoteBlock;
