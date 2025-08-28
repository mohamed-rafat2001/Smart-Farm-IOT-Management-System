import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/logo.jpg';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="@container flex items-center justify-between border-b-1 border-stone-700 px-5 py-5">
      <div className="flex w-[20%] items-center gap-x-3 font-bold">
        <img 
          src={Logo} 
          alt="Smart Farm Logo" 
          className="h-[20%] w-[20%] rounded-full object-cover" 
        />
        <h1 className="text-white">SMART FARM</h1>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex w-[50%] justify-evenly tracking-widest">
        <NavLink to="/home" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/pricing" className="nav-link">
          Pricing
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contact Us
        </NavLink>
      </nav>

      {/* Desktop Auth Buttons - Hidden on mobile */}
      <div className="hidden md:flex w-[20%] items-center justify-evenly tracking-widest">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link
          to="/signUp"
          className="rounded-lg border-1 border-amber-100 px-5 py-3 hover:bg-[#474055]"
        >
          Sign up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-expanded="false"
          aria-label="Toggle mobile menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Responsive */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="border-t border-gray-700 bg-gray-800 px-2 pt-2 pb-3 space-y-1">
          {/* Mobile Navigation Links */}
          <NavLink
            to="/home"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
            activeClassName="bg-gray-700 text-white"
          >
            Home
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
            activeClassName="bg-gray-700 text-white"
          >
            Pricing
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
            activeClassName="bg-gray-700 text-white"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
            activeClassName="bg-gray-700 text-white"
          >
            Contact Us
          </NavLink>

          {/* Mobile Auth Buttons */}
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none"
              >
                Login
              </Link>
              <Link
                to="/signUp"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-md bg-amber-100 px-3 py-2 text-base font-medium text-gray-900 hover:bg-amber-200 focus:bg-amber-200 focus:outline-none"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
