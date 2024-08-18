import { useState, useRef, useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  // Close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !profileRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white p-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center text-2xl font-bold text-black">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png"
            alt="FlexiWork Logo"
            className="h-10 w-auto"
          />
          <span className="ml-2">FlexiWork</span>
        </a>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Features</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Support</a>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            onClick={toggleDropdown}
            ref={profileRef}
          >
            <RxAvatar className="text-2xl" />
            <span className="hidden md:inline">Profile</span>
          </button>

          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
              ref={dropdownRef}
            >
              <ul className="flex flex-col p-2">
                <li className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <a href="/freelancer/profile">Profile</a>
                </li>
                <li className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <a href="#">Sign Out</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
