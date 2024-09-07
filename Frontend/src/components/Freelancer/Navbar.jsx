import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  // Toggle the mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

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
    <header className="bg-white p-4 shadow-md">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-600"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? '✖️' : '☰'}
        </button>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex space-x-8`}>
          <NavLink
            to="/freelancer"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/freelancer/projects"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/freelancer/bids"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            Bids
          </NavLink>
          <NavLink
            to="/freelancer/invoices"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            Invoices
          </NavLink>
          <NavLink
            to="/freelancer/updates"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            Project Updates
          </NavLink>
          <NavLink
            to="/freelancer/earnings"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            Earnings
          </NavLink>
          <NavLink
            to="/freelancer/notifications"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }
          >
            <FaBell className="inline-block text-lg" />
          </NavLink>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden fixed inset-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="flex flex-col p-4">
              <NavLink
                to="/freelancer"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/freelancer/projects"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink
                to="/freelancer/bids"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Bids
              </NavLink>
              <NavLink
                to="/freelancer/invoices"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Invoices
              </NavLink>
              <NavLink
                to="/freelancer/updates"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Project Updates
              </NavLink>
              <NavLink
                to="/freelancer/earnings"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Earnings
              </NavLink>
              <NavLink
                to="/freelancer/notifications"
                className={({ isActive }) =>
                  `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaBell className="inline-block text-lg" />
              </NavLink>
              <div className="border-t border-gray-200 mt-4 pt-2">
                <NavLink
                  to="/freelancer/profile"
                  className={({ isActive }) =>
                    `block text-gray-600 hover:text-blue-600 py-2 ${isActive ? 'text-blue-600 font-semibold' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/freelancer/logout"
                  className="block text-gray-600 hover:text-blue-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Out
                </NavLink>
              </div>
            </div>
          </nav>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600"
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
                  <NavLink to="/freelancer/profile">Profile</NavLink>
                </li>
                <li className="px-4 py-2 text-gray-600 hover:bg-gray-100">
                  <NavLink to="/freelancer/logout">Sign Out</NavLink>
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
