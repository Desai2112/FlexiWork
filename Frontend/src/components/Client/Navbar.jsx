import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-40 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
        <div className="flex justify-between items-center p-4">
          <img 
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png" 
            alt="Logo" 
            className="h-12" 
          />
          <button onClick={toggleMobileMenu} className="text-gray-800">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="p-4">
          <NavLink 
            to="/client" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/client/project" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/client/bids" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Bids
          </NavLink>
          <NavLink 
            to="/client/stat" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Activity Summary
          </NavLink>
          <NavLink 
            to="/client/invoice" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Invoices
          </NavLink>
          <NavLink 
            to="/client/project/deadlines" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Deadlines
          </NavLink>
          <NavLink 
            to="/client/profile" 
            end
            className={({ isActive }) => `block text-gray-800 hover:text-blue-600 transition duration-300 mb-2 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            onClick={toggleMobileMenu}
          >
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Desktop Navbar */}
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-gray-800 hover:text-blue-600 transition duration-300"
          >
            <FaBars size={28} />
          </button>
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <NavLink to="/client">
              <img 
                src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png" 
                alt="Logo" 
                className="h-12" 
              />
            </NavLink>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:space-x-6 lg:space-x-8">
            <NavLink 
              to="/client" 
              end
              className={({ isActive }) => `text-gray-800 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/client/project" 
              end
              className={({ isActive }) => `text-gray-800 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            >
              Projects
            </NavLink>
            <NavLink 
              to="/client/bids" 
              end
              className={({ isActive }) => `text-gray-800 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            >
              Bids
            </NavLink>
            <NavLink 
              to="/client/stat" 
              end
              className={({ isActive }) => `text-gray-800 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            >
              Activity Summary
            </NavLink>
            <NavLink 
              to="/client/invoice" 
              end
              className={({ isActive }) => `text-gray-800 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            >
              Invoices
            </NavLink>
            <NavLink 
              to="/client/project/deadlines" 
              end
              className={({ isActive }) => `text-gray-800 hover:text-blue-600 transition duration-300 ${isActive ? 'text-blue-600 font-bold' : ''}`}
            >
              Deadlines
            </NavLink>
          </div>
          
          {/* Profile Button */}
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="text-gray-800 hover:text-blue-600 transition duration-300 flex items-center"
            >
              <FaUserCircle size={28} />
              <span className="ml-2 hidden md:inline">Profile</span>
            </button>
            
            {/* Profile Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <NavLink 
                  to="/client/profile" 
                  onClick={closeDropdown}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </NavLink>
                <button 
                  onClick={() => {
                    closeDropdown();
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
