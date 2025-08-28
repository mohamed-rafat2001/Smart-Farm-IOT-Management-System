import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import { useState } from 'react';

function AppLayout() {
  const pageName = useLocation().pathname.split('/')[2];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#1b2127]">
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="rounded-lg bg-[#283039] p-2 text-white hover:bg-[#374151] focus:ring-2 focus:ring-blue-500 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Responsive Grid Layout */}
      <div className="flex min-h-screen">
        {/* Sidebar - Responsive */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-80 transform bg-[#283039] shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:w-80 lg:translate-x-0 xl:w-80 2xl:w-80 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="w-full flex-1 lg:ml-0">
          {/* Page Header - Responsive */}
          <header className="mx-5 border-b border-stone-700 py-5">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-extrabold tracking-widest text-white capitalize sm:text-3xl md:text-4xl lg:text-4xl">
                {pageName}
              </h1>

              {/* Mobile Close Button */}
              <button
                onClick={toggleSidebar}
                className="rounded-lg bg-[#374151] p-2 text-white hover:bg-[#4B5563] lg:hidden"
                aria-label="Close sidebar"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Content Container - Responsive */}
          <div className="px-5 pt-5 pb-20 lg:pb-5">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Alternative) */}
      <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-stone-700 bg-[#283039] lg:hidden">
        <div className="flex justify-around py-2">
          <button
            onClick={toggleSidebar}
            className="flex flex-col items-center space-y-1 rounded-lg px-3 py-2 text-xs text-stone-300 hover:bg-[#374151] hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>Menu</span>
          </button>

          <div className="flex flex-col items-center space-y-1 px-3 py-2 text-xs text-stone-400">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>{pageName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
