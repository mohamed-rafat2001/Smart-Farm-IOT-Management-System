import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/logo.jpg';
import useAuth from '../hooks/useAuth';
import { useLogout } from '../../features/authentication';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user, isAuthenticated } = useAuth();
  const { isLogOut, logOutUser } = useLogout();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogOut = () => {
    logOutUser();
    setIsMobileMenuOpen(false);
  };

  const menuLinks = [
    { to: '/home', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/50 bg-[#1b2127]/80 px-6 py-4 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/home"
          className="group flex items-center gap-x-4 transition-transform hover:scale-105"
        >
          <div className="relative">
            <motion.img
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: 'anticipate' }}
              src={Logo}
              alt="Smart Farm Logo"
              className="h-11 w-11 rounded-2xl border border-stone-700/50 object-cover shadow-xl ring-2 shadow-blue-500/5 ring-blue-500/10"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -right-1 -bottom-1 h-3.5 w-3.5 rounded-full border-2 border-[#1b2127] bg-green-500" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-white">
              SMART<span className="text-blue-500">FARM</span>
            </h1>
            <span className="text-[9px] leading-none font-bold tracking-[0.2em] text-stone-500 uppercase">
              Eco-System
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-10 md:flex">
          {menuLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-sm font-bold tracking-wide transition-all duration-300 hover:text-blue-400 ${
                  isActive ? 'text-blue-500' : 'text-stone-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="header-nav-underline"
                      className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-blue-500"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden items-center md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 rounded-[2.5rem] border border-stone-800/50 bg-stone-900/40 p-1.5 shadow-2xl backdrop-blur-md transition-all hover:bg-stone-900/60">
              <Link to="/app/profile">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-1.5 transition-all hover:bg-white/5"
                >
                  {user?.profileImg?.secure_url ? (
                    <img
                      src={user.profileImg.secure_url}
                      alt="Profile"
                      className="h-10 w-10 rounded-xl object-cover shadow-lg ring-2 ring-blue-500/20"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-black text-white shadow-lg shadow-blue-500/20">
                      {user?.firstName?.[0] || 'U'}
                    </div>
                  )}
                  <div className="flex flex-col pr-2">
                    <span className="text-xs leading-tight font-black text-white">
                      {user?.firstName || 'User'}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-blue-500/80 uppercase">
                      Dashboard
                    </span>
                  </div>
                </motion.div>
              </Link>

              <div className="mx-1 h-8 w-px bg-stone-800/50" />

              <button
                onClick={handleLogOut}
                disabled={isLogOut}
                title="Logout"
                className="group flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/5 text-stone-500 transition-all hover:bg-red-500/10 hover:text-red-400 active:scale-90"
              >
                <svg
                  className="h-5 w-5 transition-transform group-hover:rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-sm font-bold text-stone-400 transition-all duration-300 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-blue-600 px-8 py-3 text-sm font-black text-white shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.05] hover:bg-blue-500 active:scale-95"
              >
                <span>Get Started</span>
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="group rounded-2xl bg-stone-800/50 p-3 text-stone-400 transition-all duration-300 hover:bg-stone-700 hover:text-white md:hidden"
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col space-y-4 pt-6 pb-6">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-4 text-base font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600/10 text-blue-500'
                        : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <div className="flex flex-col gap-3 pt-4">
                  <Link
                    to="/app/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 rounded-3xl border border-stone-800/50 bg-stone-900/40 p-4 shadow-xl backdrop-blur-md transition-all hover:bg-stone-900/60"
                  >
                    {user?.profileImg?.secure_url ? (
                      <img
                        src={user.profileImg.secure_url}
                        alt="Profile"
                        className="h-12 w-12 rounded-2xl object-cover shadow-lg ring-2 ring-blue-500/20"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/20">
                        {user?.firstName?.[0] || 'U'}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-base leading-tight font-black text-white">
                        {user?.firstName || 'User'} {user?.lastName || ''}
                      </span>
                      <span className="text-xs font-bold tracking-widest text-blue-500/80 uppercase">
                        View Dashboard
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    disabled={isLogOut}
                    className="flex items-center justify-center gap-3 rounded-[1.25rem] border border-red-500/10 bg-red-500/5 py-4 text-sm font-black text-red-500 transition-all hover:bg-red-500/10 active:scale-95"
                  >
                    <span>{isLogOut ? 'Logging out...' : 'Logout'}</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-2xl bg-stone-800/50 py-4 text-sm font-bold text-stone-300 transition-all hover:bg-stone-700 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
