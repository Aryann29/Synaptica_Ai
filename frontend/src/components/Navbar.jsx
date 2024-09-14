import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: '100%', transition: { duration: 0.3 } }
  };

  useEffect(() => {
    console.log('Navbar - User:', user, 'Loading:', loading);
  }, [user, loading]);

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 bg-[#2B2B2B]">
      <div className="relative pt-6 pb-8 sm:pb-16">
        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/">
                <span className="sr-only">Synaptica</span>
                <img className="w-auto h-8 sm:h-14" src="logo.png" alt="Synaptica Logo" loading="lazy" width="400" />
              </Link>
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 text-[#F1EFE7] hover:text-white focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-8">
            <Link to="/experts" className="text-base font-medium text-[#F1EFE7] hover:text-white transition duration-300 ease-in-out hover:scale-110">
              Experts
            </Link>
            <Link to="/howit" className="text-base font-medium text-[#F1EFE7] hover:text-white transition duration-300 ease-in-out hover:scale-110">
              How It Works
            </Link>
            <Link to="/about" className="text-base font-medium text-[#F1EFE7] hover:text-white transition duration-300 ease-in-out hover:scale-110">
              About
            </Link>
          </div>
          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            {loading ? (
              <div className="text-[#F1EFE7]">Loading...</div>
            ) : user ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center focus:outline-none rounded-full border-2 border-white">
                  <img src={"https://img.icons8.com/?size=100&id=23264&format=png&color=FFFFFF" || user.profile?.avatar} alt="User Profile" className="w-10 h-10 rounded-full object-cover padding-[20px]" />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-[#3B3B3B] rounded-md shadow-lg py-1"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link to="/myexperts" className="block px-4 py-2 text-sm text-[#F1EFE7] hover:bg-[#4B4B4B]">My Experts</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-[#F1EFE7] hover:bg-[#4B4B4B]">Settings</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-[#F1EFE7] hover:bg-[#4B4B4B]">Log out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div>
                <motion.div className="inline-flex rounded-full shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="inline-flex items-center px-4 py-2 text-base text-[#2B2B2B] bg-[#F1EFE7] border border-transparent rounded-full cursor-pointer font-medium hover:bg-opacity-90 transition duration-300 ease-in-out">
                    Login
                  </Link>
                </motion.div>
                <motion.div className="inline-flex rounded-full shadow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/signup" className="inline-flex items-center ml-4 px-4 py-2 text-base text-[#F1EFE7] bg-[#3B3B3B] border border-transparent rounded-full cursor-pointer font-medium hover:bg-opacity-90 transition duration-300 ease-in-out">
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="rounded-lg shadow-md bg-[#3B3B3B] ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src="https://i.ibb.co/pvj74T8/Black-Outline.png" alt="Synaptica" />
                  </div>
                  <div className="-mr-2">
                    <button
                      onClick={toggleMobileMenu}
                      className="bg-[#3B3B3B] rounded-md p-2 inline-flex items-center justify-center text-[#F1EFE7] hover:text-white focus:outline-none"
                    >
                      <span className="sr-only">Close main menu</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link to="/experts" className="block px-3 py-2 rounded-md text-base font-medium text-[#F1EFE7] hover:text-white hover:bg-[#4B4B4B]">Experts</Link>
                  <Link to="/howit" className="block px-3 py-2 rounded-md text-base font-medium text-[#F1EFE7] hover:text-white hover:bg-[#4B4B4B]">How It Works</Link>
                  <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-[#F1EFE7] hover:text-white hover:bg-[#4B4B4B]">About</Link>
                </div>
                {user ? (
                  <div className="px-5 py-4 border-t border-[#4B4B4B]">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={"https://img.icons8.com/?size=100&id=23264&format=png&color=FFFFFF" || user.profile?.avatar} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-[#F1EFE7]">{user.name}</div>
                        <div className="text-sm font-medium text-[#F1EFE7] opacity-75">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Link to="/myexperts" className="block px-3 py-2 rounded-md text-base font-medium text-[#F1EFE7] hover:text-white hover:bg-[#4B4B4B]">My Experts</Link>
                      <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-[#F1EFE7] hover:text-white hover:bg-[#4B4B4B]">Settings</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#F1EFE7] hover:text-white hover:bg-[#4B4B4B]">Log out</button>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-4 border-t border-[#4B4B4B]">
                    <Link to="/login" className="block text-center w-full px-4 py-2 text-base font-medium text-[#2B2B2B] bg-[#F1EFE7] hover:bg-opacity-90 border border-transparent rounded-md">Login</Link>
                    <Link to="/signup" className="block text-center w-full px-4 py-2 text-base font-medium text-[#F1EFE7] bg-[#3B3B3B] hover:bg-opacity-90 border border-transparent rounded-md mt-2">Sign Up</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;