import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Separate state for mobile accordion to avoid state conflict
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const location = useLocation();

  // Highlight parent dropdown button if child route (/Users or /Account) is active
  const isDropdownActive = ['/Users', '/Account'].includes(location.pathname);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset mobile accordion state when mobile menu closes
  const handleMobileMenuToggle = () => {
    setIsMenuOpen((prev) => {
      if (prev) setIsMobileDropdownOpen(false);
      return !prev;
    });
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  // Helper classes
  const getDesktopClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${isActive
      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
    }`;

  const getMobileClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md transform scale-105'
      : 'text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-sm'
    }`;

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300 cursor-pointer">
              Expense Tracker
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink to="/" className={getDesktopClass}>
                Home
              </NavLink>

              {/* DESKTOP DROPDOWN MENU */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none ${isDropdownActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {/* Dropdown Card */}
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <NavLink
                      to="/Users"
                      onClick={() => setIsDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium transition-colors ${isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`
                      }
                    >
                      Users
                    </NavLink>
                    <NavLink
                      to="/Account"
                      onClick={() => setIsDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium transition-colors ${isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`
                      }
                    >
                      Account
                    </NavLink>

                    <NavLink
                      to="/Category"
                      onClick={() => setIsDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium transition-colors ${isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`
                      }
                    >
                      Category
                    </NavLink>

                        <NavLink
                      to="/PaymentMethod"
                      onClick={() => setIsDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium transition-colors ${isActive
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                        }`
                      }
                    >
                      Payment Method
                    </NavLink>
                  </div>


                )}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={handleMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
          ? 'max-h-[500px] opacity-100 visible overflow-y-auto'
          : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={getMobileClass}
          >
            Home
          </NavLink>

          {/* MOBILE DROPDOWN ACCORDION */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isDropdownActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {isMobileDropdownOpen && (
              <div className="pl-4 space-y-1 my-1 border-l-2 border-blue-400 ml-4 animate-in fade-in slide-in-from-top-1 duration-200">
                <NavLink
                  to="/Users"
                  onClick={closeMobileMenu}
                  className={getMobileClass}
                >
                  Users
                </NavLink>
                <NavLink
                  to="/Account"
                  onClick={closeMobileMenu}
                  className={getMobileClass}
                >
                  Account
                </NavLink>

                <NavLink
                  to="/Category"
                  onClick={closeMobileMenu}
                  className={getMobileClass}
                >
                  Category
                </NavLink>

                <NavLink
                  to="/PaymentMethod"
                  onClick={closeMobileMenu}
                  className={getMobileClass}
                >
                  Payment Method
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </header>
  );
};

export default Navbar;