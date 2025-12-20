import { motion as Motion } from 'framer-motion';
import Footer from '../ui/Footer';
import Header from '../ui/Header';
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1b2127]">
      <Header />
      <main className="flex-grow">
        {/* Content Container - Responsive */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="@container mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-16"
        >
          <Outlet />
        </Motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
