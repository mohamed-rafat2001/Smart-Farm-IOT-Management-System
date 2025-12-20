import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AppLayout() {
  const pageName = useLocation().pathname.split('/')[2];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-[#1b2127]">
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
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-stone-700/50 bg-[#283039] shadow-2xl transition-all duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navbar for Mobile/Tablet */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-700/50 bg-[#1b2127]/80 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className="group flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800/50 text-stone-400 transition-colors hover:bg-stone-800 hover:text-white lg:hidden"
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-6 w-6 transition-transform group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase lg:hidden">
                Smart Farm
              </span>
              <h1 className="text-xl font-bold tracking-tight text-white capitalize sm:text-2xl">
                {pageName?.replace('-', ' ') || 'Dashboard'}
              </h1>
            </div>
          </div>

          {/* User Profile / Notifications Placeholder */}
          <div className="flex items-center gap-3">
            <div className="hidden h-8 w-[1px] bg-stone-700/50 sm:block" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500"
            >
              <svg
                className="h-5 w-5"
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
            </motion.div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
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
