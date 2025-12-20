import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/logo.jpg';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuLinks = [
    { to: '/home', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-700 bg-[#1b2127]/80 px-4 py-4 backdrop-blur-md md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/home"
          className="group flex items-center gap-x-3 transition-transform hover:scale-105"
        >
          <motion.img
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            src={Logo}
            alt="Smart Farm Logo"
            className="h-10 w-10 rounded-xl border border-stone-600 object-cover"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <h1 className="text-lg font-bold tracking-tighter text-white sm:text-xl">
            SMART FARM
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {menuLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors hover:text-blue-500 ${
                  isActive ? 'text-blue-500' : 'text-stone-300'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-stone-300 transition-colors hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signUp"
            className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-stone-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full right-0 left-0 z-50 border-b border-stone-700 bg-[#1b2127] p-4 shadow-xl md:hidden"
            >
              <nav className="space-y-1">
                {menuLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-stone-800 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-700 active:scale-95"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signUp"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95"
                  >
                    Sign up
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
