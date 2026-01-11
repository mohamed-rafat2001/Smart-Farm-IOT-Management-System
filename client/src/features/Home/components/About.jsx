import { motion } from 'framer-motion';
import HeroSection from '../../../shared/components/HeroSection';
import aboutImage from '../../../assets/about-image.png';

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
    transition: { duration: 0.5 },
  },
};

function About() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full space-y-16 overflow-x-hidden md:space-y-24"
    >
      <motion.div variants={itemVariants}>
        <HeroSection
          image={aboutImage}
          bigText="About AgriTech"
          smallText="Our mission is to revolutionize agriculture through technology, empowering farmers to achieve sustainable and efficient farming practices."
        />
      </motion.div>

      {/* About Content Section */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-20 md:space-y-32">
          {/* Mission Statement */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-16 md:flex-row"
          >
            <div className="space-y-8 text-left md:w-1/2">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-stone-400">
                To revolutionize agriculture through cutting-edge technology,
                making farming more efficient, sustainable, and profitable for
                farmers worldwide.
              </p>
              <div className="h-2 w-24 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
            </div>
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-stone-700/50 bg-[#283039]/30 p-12 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 md:w-1/2">
              <div className="absolute top-0 right-0 h-40 w-40 bg-blue-600/10 blur-[80px] transition-all duration-500 group-hover:bg-blue-600/20" />
              <p className="relative z-10 text-2xl leading-relaxed text-stone-300 italic">
                "We believe that technology should serve the earth, not just
                exploit it."
              </p>
            </div>
          </motion.div>

          {/* Vision Statement */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-16 md:flex-row-reverse"
          >
            <div className="space-y-8 text-left md:w-1/2">
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Our Vision
              </h3>
              <p className="text-xl leading-relaxed text-stone-400">
                A world where every farmer has access to intelligent farming
                solutions that maximize yield while preserving our environment
                for future generations.
              </p>
              <div className="h-2 w-24 rounded-full bg-gradient-to-r from-green-600 to-green-400" />
            </div>
            <div className="group relative overflow-hidden rounded-[2.5rem] border border-stone-700/50 bg-[#283039]/30 p-12 backdrop-blur-sm transition-all duration-500 hover:border-green-500/30 md:w-1/2">
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-green-600/10 blur-[80px] transition-all duration-500 group-hover:bg-green-600/20" />
              <p className="relative z-10 text-2xl leading-relaxed text-stone-300 italic">
                "Sustainable growth is the only growth that matters."
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={itemVariants} className="space-y-16">
            <div className="space-y-6 text-center">
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Our Values
              </h3>
              <p className="mx-auto max-w-2xl text-xl text-stone-400">
                The core principles that guide everything we do at AgriTech.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Innovation',
                  desc: 'Pushing boundaries in agricultural technology through continuous research and development.',
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  ),
                  color: 'blue',
                },
                {
                  title: 'Sustainability',
                  desc: 'Protecting our planet and resources while feeding the growing global population.',
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ),
                  color: 'green',
                },
                {
                  title: 'Community',
                  desc: 'Supporting farmers in their journey to success and building strong agricultural networks.',
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  ),
                  color: 'orange',
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="rounded-[2.5rem] border border-stone-700/50 bg-[#283039]/30 p-10 text-left backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-[#283039]/50"
                >
                  <div
                    className={`h-16 w-16 rounded-2xl bg-${value.color}-500/10 mb-8 flex items-center justify-center border border-${value.color}-500/20`}
                  >
                    {value.icon}
                  </div>
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    {value.title}
                  </h4>
                  <p className="text-lg leading-relaxed text-stone-400">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default About;


