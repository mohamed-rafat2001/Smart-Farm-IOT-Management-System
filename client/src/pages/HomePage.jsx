import { motion as Motion, AnimatePresence } from 'framer-motion';
import Footer from '../shared/components/Footer';
import Header from '../shared/components/Header';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../shared/hooks/useAuth';

function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/app/farms" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1b2127]">
      <Header />
      <main className="flex-grow">
        {/* Content Container - Responsive */}
        <div className="@container mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-16">
          <AnimatePresence mode="wait">
            <Motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </Motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
