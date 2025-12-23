import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../Hooks/useAuth';
import NotificationsDropdown from './NotificationsDropdown.jsx';
import { useNotifications } from '../features/notifications/useNotifications.js';
import GlobalDeviceMonitor from '../features/farm/GlobalDeviceMonitor.jsx';

function AppLayout() {
  const pageName = useLocation().pathname.split('/')[2];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef(null);
  const { data: user } = useAuth();
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotificationsOpen]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#1b2127]">
      <GlobalDeviceMonitor />
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Responsive */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#1b2127] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden lg:pl-72">
        {/* Top Navbar for Mobile/Tablet */}
        <header className="z-30 flex h-24 shrink-0 items-center justify-between border-b border-stone-800/50 bg-[#1b2127]/80 px-6 backdrop-blur-xl lg:px-12">
          <div className="flex items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={toggleSidebar}
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-800/50 text-stone-400 transition-all duration-300 hover:bg-stone-700 hover:text-white lg:hidden"
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase lg:hidden">
                Smart Farm
              </span>
              <h1 className="text-2xl font-black tracking-tight text-white capitalize">
                {pageName?.replace('-', ' ') || 'Dashboard'}
              </h1>
            </div>
          </div>

          {/* User Profile / Notifications / Search */}
          <div className="flex items-center gap-6">
            <div className="hidden h-10 w-[1px] bg-stone-800/50 sm:block" />
            <div className="flex items-center gap-4">
              <div className="relative" ref={notificationRef}>
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleNotifications}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                    isNotificationsOpen
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-stone-800/50 text-stone-400 hover:bg-stone-700 hover:text-blue-400'
                  }`}
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex transition-all duration-300">
                      <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75 ${isNotificationsOpen ? 'hidden' : ''}`}
                      ></span>
                      <span
                        className={`relative flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black shadow-lg ${isNotificationsOpen ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <NotificationsDropdown
                      onClose={() => setIsNotificationsOpen(false)}
                    />
                  )}
                </AnimatePresence>
              </div>

              <Link to="/app/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hidden cursor-pointer items-center gap-3 rounded-2xl bg-stone-800/30 p-1.5 pr-4 transition-all hover:bg-stone-800/50 sm:flex"
                >
                  {user?.profileImg?.secure_url ? (
                    <img
                      src={user.profileImg.secure_url}
                      alt="Profile"
                      className="h-9 w-9 rounded-xl object-cover shadow-lg"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                      {user?.firstName?.[0] || 'U'}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs leading-none font-bold text-white">
                      {user?.firstName || 'Guest'}
                    </span>
                    <span className="text-[10px] font-medium text-stone-500 capitalize">
                      {user?.role || 'User'}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
