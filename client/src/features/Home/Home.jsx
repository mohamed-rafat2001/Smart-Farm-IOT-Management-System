import { motion } from 'framer-motion';
import HeroSection from '../../ui/HeroSection';
import heroImage from '../../assets/3d-illustration-smart-farming-concept_932730-391.avif';
import realTimeImage from '../../assets/real-Time.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-24 pb-20"
    >
      <motion.div variants={itemVariants}>
        <HeroSection
          image={heroImage}
          bigText="Smart Farming for a Sustainable Future"
          smallText="Monitor your crops, manage your resources, and optimize your yield with our advanced IoT-powered agricultural platform."
        />
      </motion.div>

      {/* Features Section */}
      <section className="px-4">
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Why Choose AgriTech?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
            Our platform provides everything you need to transform your farm
            into a high-tech, efficient operation.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Real-time Monitoring',
              description:
                'Get instant data from your soil sensors and weather stations directly to your dashboard.',
              icon: (
                <svg
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
              color: 'blue',
            },
            {
              title: 'Resource Optimization',
              description:
                'Save water and fertilizers by applying them exactly where and when they are needed.',
              icon: (
                <svg
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              ),
              color: 'green',
            },
            {
              title: 'Yield Prediction',
              description:
                'Use AI-driven insights to predict your harvest and plan your sales in advance.',
              icon: (
                <svg
                  className="h-8 w-8 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ),
              color: 'orange',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="rounded-[2.5rem] border border-stone-700/50 bg-[#283039]/30 p-10 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-[#283039]/50"
            >
              <div
                className={`h-16 w-16 rounded-2xl bg-${feature.color}-500/10 mb-8 flex items-center justify-center border border-${feature.color}-500/20`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-lg leading-relaxed text-stone-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real-time Section */}
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-stone-700/50 bg-[#283039]/20 px-8 py-24 backdrop-blur-sm">
        <div className="absolute top-0 right-0 -mt-32 -mr-32 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-96 w-96 rounded-full bg-green-600/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center gap-20 lg:flex-row">
          <motion.div variants={itemVariants} className="lg:w-1/2">
            <div className="group relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-blue-600/20 to-green-600/20 opacity-0 blur-2xl transition duration-1000 group-hover:opacity-100"></div>
              <img
                src={realTimeImage}
                alt="Real-time dashboard"
                className="relative w-full rounded-[2rem] border border-stone-700/50 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8 lg:w-1/2">
            <h2 className="text-4xl leading-tight font-bold text-white sm:text-5xl">
              Precision Agriculture at Your Fingertips
            </h2>
            <p className="text-xl leading-relaxed text-stone-400">
              Our real-time dashboard gives you a complete overview of your
              farm's health. Monitor soil moisture, temperature, and nutrient
              levels from anywhere in the world.
            </p>
            <ul className="space-y-5">
              {[
                'Instant alerts for critical conditions',
                'Historical data analysis for better planning',
                'Multi-device support (Mobile, Tablet, Desktop)',
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-lg text-stone-300"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                    <svg
                      className="h-4 w-4 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 text-center">
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-stone-400">
            Setting up AgriTech is fast and easy. Follow these steps to start
            optimizing your farm.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Install Sensors',
              desc: 'Place our wireless sensors in your fields.',
            },
            {
              step: '2',
              title: 'Connect Hub',
              desc: 'Sync the sensors with our smart gateway.',
            },
            {
              step: '3',
              title: 'Start Monitoring',
              desc: 'Log in to your dashboard and see the data.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-blue-500/20 bg-blue-600/10 text-4xl font-bold text-blue-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                {item.step}
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
                {item.title}
              </h3>
              <p className="text-lg leading-relaxed text-stone-400">
                {item.desc}
              </p>
              {index < 2 && (
                <div className="absolute top-12 left-[75%] -z-10 hidden h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-transparent md:block"></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default Home;
