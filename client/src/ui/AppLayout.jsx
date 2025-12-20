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
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#1b2127] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:static lg:w-72 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Navbar for Mobile/Tablet */}
        <header className="sticky top-0 z-30 flex h-24 items-center justify-between border-b border-stone-800/50 bg-[#1b2127]/80 px-6 backdrop-blur-xl lg:px-12">
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
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-800/50 text-stone-400 transition-all duration-300 hover:bg-stone-700 hover:text-blue-400"
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
                <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                </span>
              </motion.button>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="hidden cursor-pointer items-center gap-3 rounded-2xl bg-stone-800/30 p-1.5 pr-4 transition-all hover:bg-stone-800/50 sm:flex"
              >
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white leading-none">User Name</span>
                  <span className="text-[10px] font-medium text-stone-500">Administrator</span>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="mx-auto max-w-7xl p-6 sm:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
