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
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
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
                  className="h-8 w-8 text-blue-500"
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
                  className="h-8 w-8 text-green-500"
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
                  className="h-8 w-8 text-orange-500"
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
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-stone-700/50 bg-[#283039]/30 p-8 shadow-xl transition-all hover:border-blue-500/50 hover:bg-[#283039]/50"
            >
              <div
                className={`h-14 w-14 rounded-xl bg-${feature.color}-500/10 mb-6 flex items-center justify-center`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-stone-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real-time Section */}
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-stone-700/50 bg-[#1e252b]/50 px-6 py-20">
        <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-blue-600/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-green-600/5 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center gap-16 md:flex-row">
          <motion.div variants={itemVariants} className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 opacity-20 blur transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
              <img
                src={realTimeImage}
                alt="Real-time dashboard"
                className="relative w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 md:w-1/2">
            <h2 className="text-3xl leading-tight font-bold text-white sm:text-4xl">
              Precision Agriculture at Your Fingertips
            </h2>
            <p className="text-lg leading-relaxed text-stone-400">
              Our real-time dashboard gives you a complete overview of your
              farm's health. Monitor soil moisture, temperature, and nutrient
              levels from anywhere in the world.
            </p>
            <ul className="space-y-4">
              {[
                'Instant alerts for critical conditions',
                'Historical data analysis for better planning',
                'Multi-device support (Mobile, Tablet, Desktop)',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-300">
                  <svg
                    className="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 text-center">
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-stone-400">
            Setting up AgriTech is fast and easy. Follow these steps to start
            optimizing your farm.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
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
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-600/10 text-3xl font-bold text-blue-500 transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                {item.step}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400">
                {item.title}
              </h3>
              <p className="leading-relaxed text-stone-400">{item.desc}</p>
              {index < 2 && (
                <div className="absolute top-10 left-[70%] -z-10 hidden h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-transparent md:block"></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default Home;
