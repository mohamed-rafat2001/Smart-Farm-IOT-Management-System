import Footer from '../ui/Footer';
import Header from '../ui/Header';
import { Outlet } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#1b2127]">
        {/* Content Container - Responsive */}
        <div className="@container mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-16">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
