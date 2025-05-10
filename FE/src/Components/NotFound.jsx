import React from 'react';
import { Link } from 'react-router-dom';
import notFoundGif from '../assets/CodePen-404-Page.gif'; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <img
        src={notFoundGif}
        alt="404 Not Found"
        className="w-[800px] max-w-full h-auto mb-10"
      />
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
