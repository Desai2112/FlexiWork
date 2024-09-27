import { useState } from 'react';
import { Link } from 'react-router-dom';

const LNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md" style={{background:'rgb(34,40,49)'}}>
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-6">
        <Link to="/" className="flex items-center ml-8">
          <img
            src="https://res.cloudinary.com/dgwtgr6do/image/upload/v1727454923/wklcgejokh0lqrrbphaz.png"
            alt="Freelance Hub"
            className="h-18 w-24"
          />
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-16 text-lg font-medium">
          <a href="#hero" className="hover:text-blue-600 transition-colors hover:font-bold" style={{color:'rgb(238, 238, 238)'}}>
            Home
          </a>
          <a href="#services" className="hover:text-blue-600 transition-colors hover:font-bold" style={{color:'rgb(238, 238, 238)'}}>
            Services
          </a>
          <a href="#freelancers" className="hover:text-blue-600 transition-colors hover:font-bold" style={{color:'rgb(238, 238, 238)'}}>
            Freelancers
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors hover:font-bold" style={{color:'rgb(238, 238, 238)'}}>
            Contact Us
          </a>
        </nav>
        <button
          className="md:hidden flex items-center text-gray-600 hover:text-blue-600"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <Link
          to="/login"
          className="hidden md:block text-white px-4 py-2 mr-8 rounded-lg hover:bg-blue-700 transition-colors"
          style={{background:'rgb(118,171,174)',color:'rgb(238,238,238)'}}
        >
          Login
        </Link>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-4 space-y-2">
            <a href="#hero" className="block text-base font-medium hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#services" className="block text-base font-medium hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#freelancers" className="block text-base font-medium hover:text-blue-600 transition-colors">
              Freelancers
            </a>
            <a href="#contact" className="block text-base font-medium hover:text-blue-600 transition-colors">
              Contact Us
            </a>
            <Link
              to="/login"
              className="block bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LNavbar;
