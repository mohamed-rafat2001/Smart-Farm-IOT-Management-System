import homeImage from '../../assets/home-image.jpg';
import HeroSection from '../../ui/HeroSection';
import realTime from '../../assets/real-Time.png';
import customSettingsImage from '../../assets/customSettings-image.jpg';
import monitorImage from '../../assets/monitor.jpg';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        image={homeImage}
        bigText="revolutionize your farming with agriTech"
        smallText="Experience the future of agriculture with our intelligent farming solutions. Maximize your yield, minimize your effort, and cultivate your dreams with our cutting-edge technology."
      />

      {/* Key Features Section */}
      <section className="mb-10 sm:mb-12 lg:mb-16">
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Key Features
            </h1>
            <p className="w-full text-sm text-stone-300 sm:w-[85%] sm:text-base md:w-[75%] lg:w-[65%] lg:text-lg">
              Our agriTech application offers a range of features designed to
              optimize your farming process and enhance productivity.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Feature 1: Real-time Monitoring */}
            <div className="space-y-4 rounded-2xl bg-[#283039] p-4 transition-all duration-300 hover:bg-[#374151] hover:shadow-lg sm:p-6 lg:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 sm:h-14 sm:w-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400 sm:h-7 sm:w-7"
                  viewBox="0 0 640 512"
                  fill="currentColor"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                Real-time Monitoring
              </h2>
              <p className="text-sm leading-relaxed text-stone-400 sm:text-base lg:text-lg">
                Keep a close eye on your farm's conditions with real-time data
                on temperature, humidity, soil moisture and more.
              </p>
            </div>

            {/* Feature 2: Automated Irrigation */}
            <div className="space-y-4 rounded-2xl bg-[#283039] p-4 transition-all duration-300 hover:bg-[#374151] hover:shadow-lg sm:p-6 lg:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600/20 sm:h-14 sm:w-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400 sm:h-7 sm:w-7"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M48 448L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c17.7 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                Automated Irrigation
              </h2>
              <p className="text-sm leading-relaxed text-stone-400 sm:text-base lg:text-lg">
                Ensure your crops receive the perfect amount of water with our
                automated irrigation system, saving water and time.
              </p>
            </div>

            {/* Feature 3: Crop Management */}
            <div className="space-y-4 rounded-2xl bg-[#283039] p-4 transition-all duration-300 hover:bg-[#374151] hover:shadow-lg sm:p-6 lg:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 sm:h-14 sm:w-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400 sm:h-7 sm:w-7"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                >
                  <path d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0l32 0c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64l32 0c123.7 0 224 100.3 224 224l0 32 0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160C100.3 320 0 219.7 0 96z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                Crop Management
              </h2>
              <p className="text-sm leading-relaxed text-stone-400 sm:text-base lg:text-lg">
                Manage your crops efficiently with tools for tracking growth,
                scheduling tasks, and optimizing resource allocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-10 sm:mb-12 lg:mb-16">
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
              How It Works
            </h1>
            <p className="w-full text-sm text-stone-300 sm:w-[85%] sm:text-base md:w-[75%] lg:w-[65%] lg:text-lg">
              Our agriTech application integrates seamlessly with your existing
              farm infrastructure, providing a user-friendly interface for
              managing your operations.
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {/* Step 1: Connect Your Farm */}
            <div className="space-y-4 text-center sm:text-left">
              <div className="group relative overflow-hidden rounded-2xl bg-[#283039] p-2 transition-all duration-300 hover:bg-[#374151] hover:shadow-lg">
                <img
                  src={realTime}
                  alt="Connect your farm"
                  className="h-48 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56 lg:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-25 transition-all duration-300 group-hover:opacity-10"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                  Connect Your Farm
                </h2>
                <p className="text-sm leading-relaxed text-stone-400 sm:text-base lg:text-lg">
                  Connect your farm's sensors and systems to our platform for
                  real-time data collection.
                </p>
              </div>
            </div>

            {/* Step 2: Customize Your Settings */}
            <div className="space-y-4 text-center sm:text-left">
              <div className="group relative overflow-hidden rounded-2xl bg-[#283039] p-2 transition-all duration-300 hover:bg-[#374151] hover:shadow-lg">
                <img
                  src={customSettingsImage}
                  alt="Customize your settings"
                  className="h-48 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56 lg:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-25 transition-all duration-300 group-hover:opacity-10"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                  Customize Your Settings
                </h2>
                <p className="text-sm leading-relaxed text-stone-400 sm:text-base lg:text-lg">
                  Tailor the application to your specific needs, setting up
                  automated tasks and alerts.
                </p>
              </div>
            </div>

            {/* Step 3: Monitor and Optimize */}
            <div className="space-y-4 text-center sm:text-left">
              <div className="group relative overflow-hidden rounded-2xl bg-[#283039] p-2 transition-all duration-300 hover:bg-[#374151] hover:shadow-lg">
                <img
                  src={monitorImage}
                  alt="Monitor and optimize"
                  className="h-48 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105 sm:h-56 lg:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-25 transition-all duration-300 group-hover:opacity-10"></div>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
                  Monitor and Optimize
                </h2>
                <p className="text-sm leading-relaxed text-stone-400 sm:text-base lg:text-lg">
                  Monitor your farm's performance, analyze data, and make
                  informed decisions to optimize your yield.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
