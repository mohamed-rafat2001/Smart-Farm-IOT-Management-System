import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
    <section id="hero-section" className="mb-8 sm:mb-10 md:mb-12 lg:mb-15">
      {/* Hero Container */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-stone-800 to-stone-900 sm:h-80 md:h-96 lg:h-[550px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-600 border-t-blue-500"></div>
              <p className="text-stone-400">Loading...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {imageError && (
          <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-red-900 to-red-800 sm:h-80 md:h-96 lg:h-[550px]">
            <div className="text-center text-white">
              <p className="text-lg font-semibold">Image failed to load</p>
              <p className="text-sm text-red-200">Please refresh the page</p>
            </div>
          </div>
        )}

        {/* Hero Image */}
        {image && !imageError && (
          <img
            src={image}
            alt="hero background"
            className={`h-64 w-full object-cover transition-opacity duration-500 sm:h-80 md:h-96 lg:h-[550px] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="eager"
            decoding="async"
          />
        )}

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Hero Content */}
        <div className="absolute top-1/2 left-1/2 w-[90%] -translate-x-1/2 -translate-y-1/2 space-y-6 text-center tracking-widest text-white sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%]">
          {/* Main Heading */}
          <h1 className="text-2xl leading-tight font-bold capitalize sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            {bigText}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base md:text-lg lg:text-xl">
            {smallText}
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              className="cursor-pointer rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 sm:px-8 sm:py-3 sm:text-base md:px-10 md:py-3 lg:px-12 lg:py-4 lg:text-lg"
              onClick={handleButton}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
