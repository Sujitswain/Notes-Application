import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className='flex items-center m-auto p-2 justify-between'>
        <h1 className='text-[28px] font-extrabold uppercase tracking-wider'>Notes</h1>
        <button onClick={() => navigate('/login')} className='bg-blue-300 text-blue-700 font-[700] px-4 py-[4px] rounded-md hover:bg-blue-400 hover:text-blue-700'>
            Login
        </button>
    </div>
  )
}

export default Navbar;