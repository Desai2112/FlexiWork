// import React from 'react';
import { Link } from 'react-router-dom';

const LNavbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-6">
        <Link to="/" className="flex ml-8 items-center">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png"
            alt="Freelance Hub"
            className="h-18 w-24"
          />
        </Link>
        <nav className="flex-1 flex items-center justify-center space-x-16 text-lg font-medium">
          <a
            href="#hero"
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#services"
            className="hover:text-blue-600 transition-colors"
          >
            Services
          </a>
          <a
            href="#freelancers"
            className="hover:text-blue-600 transition-colors"
          >
            Freelancers
          </a>
          <a
            href="#contact"
            className="hover:text-blue-600 transition-colors"
          >
            Contact Us
          </a>
        </nav>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 mr-8 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default LNavbar;
