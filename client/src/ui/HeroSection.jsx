import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function HeroSection({ image, bigText, smallText }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  function handleButton() {
    navigate('/signUp');
  }

  // Preload image to prevent delay
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
      img.src = image;
    }
  }, [image]);

  return (
    <section id="hero-section" className="relative mb-12 sm:mb-16 md:mb-20">
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute -right-24 bottom-24 -z-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px]" />

      {/* Hero Container */}
      <div className="group relative overflow-hidden rounded-[3rem] border border-stone-800/50 bg-[#1b2127]/40 shadow-2xl backdrop-blur-sm">
        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="flex h-[300px] w-full items-center justify-center bg-[#1b2127] sm:h-[400px] md:h-[500px] lg:h-[650px]">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-stone-800 border-t-blue-500" />
                <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-blue-500/20" />
              </div>
              <p className="text-xs font-black tracking-[0.2em] text-stone-500 uppercase">
                Synchronizing...
              </p>
            </div>
          </div>
        )}

        {/* Hero Image */}
        {image && !imageError && (
          <div className="relative overflow-hidden">
            <img
              src={image}
              alt="hero background"
              className={`h-[300px] w-full object-cover transition-all duration-1000 group-hover:scale-105 sm:h-[400px] md:h-[500px] lg:h-[650px] ${
                imageLoaded ? 'opacity-40 grayscale-[0.2]' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="eager"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b2127] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1b2127]/40 via-transparent to-transparent" />
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-600/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                The Future of Agriculture
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mx-auto max-w-4xl text-3xl leading-[1.1] font-black tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {bigText}
                <span className="text-blue-500">.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-2xl text-base leading-relaxed font-medium text-stone-400 sm:text-lg md:text-xl"
            >
              {smallText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <button
                className="group relative overflow-hidden rounded-[1.5rem] bg-blue-600 px-12 py-5 text-sm font-black tracking-[0.2em] text-white uppercase shadow-2xl shadow-blue-900/40 transition-all duration-500 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95"
                onClick={handleButton}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get Started
                  <svg
                    className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
