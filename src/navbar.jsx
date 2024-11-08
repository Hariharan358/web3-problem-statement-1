import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-lg w-100%">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between w-full">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-10 h-10 text-white"
          >
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M20,50 Q50,10 80,50 Q50,90 20,50 Z" fill="currentColor" />
          </svg>
          <Link to="/" className="text-white text-2xl font-semibold">
            InsuranceCo
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white text-lg hover:text-indigo-300">Home</Link>
          <Link to="/about" className="text-white text-lg hover:text-indigo-300">About</Link>
          <Link to="/services" className="text-white text-lg hover:text-indigo-300">Services</Link>
          <Link to="/contact" className="text-white text-lg hover:text-indigo-300">Contact</Link>
          <Link to="/register" className="text-white text-lg bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md">
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-indigo-600 w-full`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link to="/" className="text-white text-lg hover:text-indigo-300">Home</Link>
          <Link to="/about" className="text-white text-lg hover:text-indigo-300">About</Link>
          <Link to="/services" className="text-white text-lg hover:text-indigo-300">Services</Link>
          <Link to="/contact" className="text-white text-lg hover:text-indigo-300">Contact</Link>
          <Link to="/register" className="text-white text-lg bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-md">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
