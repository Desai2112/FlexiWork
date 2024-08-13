import { useState, useRef, useEffect } from 'react';
import { RxAvatar } from 'react-icons/rx';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prevState => !prevState);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !avatarRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="shadow mb-2">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="#" className="flex items-center whitespace-nowrap text-2xl font-black">
          <img
            src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png"
            alt="FlexiWork Logo"
            className="mr-2 h-10 w-auto"
          />
          <span className="text-black">FlexiWork</span>
        </a>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
            <li className="text-gray-600 md:mr-12 hover:text-blue-600">
              <a href="#">Pricing</a>
            </li>
            <li className="text-gray-600 md:mr-12 hover:text-blue-600">
              <a href="#">Features</a>
            </li>
            <li className="text-gray-600 md:mr-12 hover:text-blue-600">
              <a href="#">Support</a>
            </li>
            <li className="relative text-gray-600 md:mr-12 hover:text-blue-600">
              <button
                className="flex items-center space-x-2"
                onClick={toggleDropdown}
                ref={avatarRef}
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
                      <a href="#">Profile</a>
                    </li>
                    <li className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                      <a href="#">Sign Out</a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
