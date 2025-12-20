import { NavLink } from 'react-router-dom';
import Button from './Button';
import useLogOut from '../features/authentication/useLogout';
import Logo from '../assets/logo.jpg';

function Sidebar({ onClose }) {
  const { isLogOut, logOutUser } = useLogOut();

  const handleLogOut = () => {
    logOutUser();
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when navigation item is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="flex h-full min-h-screen flex-col bg-[#283039] text-stone-500">
      {/* Logo and Brand Section - Responsive */}
      <div className="flex h-20 flex-shrink-0 flex-col items-center justify-center border-b border-stone-700 px-4 py-4 lg:flex-row lg:justify-start lg:space-x-3">
        <div className="mb-2 lg:mb-0">
          <img
            src={Logo}
            alt="Smart Farm Logo"
            className="h-12 w-12 rounded-full border-2 border-stone-600 object-cover sm:h-16 sm:w-16 lg:h-14 lg:w-14"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-sm font-bold text-white sm:text-base lg:text-lg">
            Smart Farm
          </h1>
          <p className="hidden text-xs text-stone-400 lg:block">
            Management System
          </p>
        </div>
      </div>

      {/* Navigation Menu - Responsive */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          {/* Farms Navigation */}
          <NavLink
            to="/app/farms"
            onClick={handleNavClick}
            className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-300 transition-all duration-200 hover:bg-stone-700 hover:text-white focus:bg-stone-700 focus:text-white focus:outline-none sm:text-base lg:py-3"
            activeClassName="bg-stone-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
              viewBox="0 0 640 512"
              fill="currentColor"
            >
              <path d="M96 64c0-35.3 28.7-64 64-64L266.3 0c26.2 0 49.7 15.9 59.4 40.2L373.7 160 480 160l0-33.8c0-24.8 5.8-49.3 16.9-71.6l2.5-5c7.9-15.8 27.1-22.2 42.9-14.3s22.2 27.1 14.3 42.9l-2.5 5c-6.7 13.3-10.1 28-10.1 42.9l0 33.8 56 0c22.1 0 40 17.9 40 40l0 45.4c0 16.5-8.5 31.9-22.6 40.7l-43.3 27.1c-14.2-5.9-29.8-9.2-46.1-9.2c-39.3 0-74.1 18.9-96 48l-80 0c0 17.7-14.3 32-32 32l-8.2 0c-1.7 4.8-3.7 9.5-5.8 14.1l5.8 5.8c12.5 12.5 12.5 32.8 0 45.3l-22.6 22.6c-12.5 12.5-32.8 12.5-45.3 0l-5.8-5.8c-4.6 2.2-9.3 4.1-14.1 5.8l0 8.2c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-8.2c-4.8-1.7-9.5-3.7-14.1-5.8l-5.8 5.8c-12.5 12.5-32.8 12.5-45.3 0L40.2 449.1c-12.5-12.5-12.5-32.8 0-45.3l5.8-5.8c-2.2-4.6-4.1-9.3-5.8-14.1L32 384c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l8.2 0c1.7-4.8 3.7-9.5 5.8-14.1l-5.8-5.8c-12.5-12.5-12.5-32.8 0-45.3l22.6-22.6c9-9 21.9-11.5 33.1-7.6l0-.6 0-32 0-96zm170.3 0L160 64l0 96 32 0 112.7 0L266.3 64zM176 256a80 80 0 1 0 0 160 80 80 0 1 0 0-160zM528 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0 64c-48.6 0-88-39.4-88-88c0-29.8 14.8-56.1 37.4-72c14.3-10.1 31.8-16 50.6-16c2.7 0 5.3 .1 7.9 .3c44.9 4 80.1 41.7 80.1 87.7c0 48.6-39.4 88-88 88z" />
            </svg>
            <span className="truncate">Farms</span>
          </NavLink>

          {/* Devices Navigation */}
          <NavLink
            to="/app/devices"
            onClick={handleNavClick}
            className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-300 transition-all duration-200 hover:bg-stone-700 hover:text-white focus:bg-stone-700 focus:text-white focus:outline-none sm:text-base lg:py-3"
            activeClassName="bg-stone-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
              viewBox="0 0 640 512"
              fill="currentColor"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" />
            </svg>
            <span className="truncate">Devices</span>
          </NavLink>

          {/* Insights Navigation */}
          <NavLink
            to="/app/insights"
            onClick={handleNavClick}
            className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-300 transition-all duration-200 hover:bg-stone-700 hover:text-white focus:bg-stone-700 focus:text-white focus:outline-none sm:text-base lg:py-3"
            activeClassName="bg-stone-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
              viewBox="0 0 640 512"
              fill="currentColor"
            >
              <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
            </svg>
            <span className="truncate">Insights</span>
          </NavLink>

          {/* Profile Navigation */}
          <NavLink
            to="/app/profile"
            onClick={handleNavClick}
            className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-300 transition-all duration-200 hover:bg-stone-700 hover:text-white focus:bg-stone-700 focus:text-white focus:outline-none sm:text-base lg:py-3"
            activeClassName="bg-stone-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
            </svg>
            <span className="truncate">Profile</span>
          </NavLink>

          {/* Settings Navigation */}
          <NavLink
            to="/app/settings"
            onClick={handleNavClick}
            className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium text-stone-300 transition-all duration-200 hover:bg-stone-700 hover:text-white focus:bg-stone-700 focus:text-white focus:outline-none sm:text-base lg:py-3"
            activeClassName="bg-stone-700 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </svg>
            <span className="truncate">Settings</span>
          </NavLink>
        </div>
      </nav>

      {/* Logout Button - Responsive */}
      <div className="flex-shrink-0 border-t border-stone-700 p-4">
        <Button
          className="w-full rounded-xl bg-red-600 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-stone-800 focus:outline-none sm:text-base"
          color="#ef4444"
          disabled={isLogOut}
          onClick={handleLogOut}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
            <span className="sm:hidden">Exit</span>
          </div>
        </Button>
      </div>

      {/* Mobile Close Button - Only visible on mobile */}
      <div className="flex-shrink-0 border-t border-stone-700 p-4 lg:hidden">
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-stone-600 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-stone-500 focus:bg-stone-500 focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 focus:ring-offset-stone-800 focus:outline-none"
        >
          Close Menu
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
