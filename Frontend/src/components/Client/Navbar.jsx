import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for the avatar

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="px-12 container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          
          {/* Navigation Links */}
          <div className="flex text-md space-x-8">
            <NavLink 
              exact
              to="/" 
              className="text-gray-800 hover:text-blue-600 transition duration-300"
              activeClassName="text-blue-600 font-bold"
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/projects" 
              className="text-gray-800 hover:text-blue-600 transition duration-300"
              activeClassName="text-blue-600 font-bold"
            >
              My Projects
            </NavLink>
            <NavLink 
              to="/add-project" 
              className="text-gray-800 hover:text-blue-600 transition duration-300"
              activeClassName="text-blue-600 font-bold"
            >
              Add New Project
            </NavLink>
            <NavLink 
              to="/bids" 
              className="text-gray-800 hover:text-blue-600 transition duration-300"
              activeClassName="text-blue-600 font-bold"
            >
              Bids
            </NavLink>
          </div>
        </div>
        
        {/* Profile/Avatar with Dropdown */}
        <div className="relative">
          <div onClick={toggleDropdown} className="cursor-pointer">
            <FaUserCircle size={28} className="text-gray-800 hover:text-blue-600 transition duration-300" />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <NavLink 
                to="/profile" 
                onClick={closeDropdown}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </NavLink>
              <button 
                onClick={() => {
                  // Handle logout logic here
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
  );
};

export default Navbar;
