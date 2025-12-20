import { motion } from 'framer-motion';

const Insights = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative space-y-12 pb-10"
    >
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px]" />

      <header className="relative space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="h-12 w-1.5 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
          <h1 className="text-4xl font-black tracking-tight text-white">
            Farm Insights<span className="text-blue-500">.</span>
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-lg font-medium text-stone-400"
        >
          Analyze your farm's performance, resource usage, and growth metrics in
          real-time.
        </motion.p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Cards for Insights */}
        {[
          { title: 'Soil Moisture', value: '42%', trend: '+5%', color: 'blue' },
          {
            title: 'Avg Temperature',
            value: '24°C',
            trend: '-2%',
            color: 'orange',
          },
          {
            title: 'Humidity Level',
            value: '65%',
            trend: '+1%',
            color: 'green',
          },
          {
            title: 'Water Usage',
            value: '1.2k L',
            trend: '-10%',
            color: 'cyan',
          },
          {
            title: 'Crop Health',
            value: 'Optimal',
            trend: 'Stable',
            color: 'emerald',
          },
          {
            title: 'Battery Levels',
            value: '88%',
            trend: '-5%',
            color: 'yellow',
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#1b2127]/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-stone-700/50"
          >
            <div
              className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-${stat.color}-500/5 blur-2xl transition-all group-hover:bg-${stat.color}-500/10`}
            />

            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black tracking-[0.2em] text-stone-500 uppercase">
                {stat.title}
              </h3>
              <span
                className={`rounded-xl px-3 py-1.5 text-xs font-black tracking-wider shadow-sm ${
                  stat.trend.startsWith('+')
                    ? 'bg-green-500/10 text-green-500'
                    : stat.trend.startsWith('-')
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-blue-500/10 text-blue-500'
                }`}
              >
                {stat.trend}
              </span>
            </div>

            <div className="mt-8 flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-4xl font-black tracking-tight text-white">
                  {stat.value}
                </span>
                <p className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                  current state
                </p>
              </div>
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}
              >
                <div
                  className={`h-3 w-3 rounded-full bg-${stat.color}-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8 }}
        className="relative overflow-hidden rounded-[3rem] border border-stone-800/50 bg-[#1b2127]/40 p-12 text-center shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-stone-700/50"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-600/5 to-transparent" />

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-900/10 transition-transform duration-700 hover:rotate-[360deg]">
          <svg
            className="h-10 w-10"
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
        </div>

        <h3 className="mt-8 text-3xl font-black tracking-tight text-white">
          Advanced Analytics <span className="text-blue-500">Coming Soon.</span>
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed font-medium text-stone-400">
          We're engineering deep learning models to provide hyper-accurate
          predictions for your farm's metabolic health, resource efficiency, and
          projected yield.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <div className="h-1.5 w-12 rounded-full bg-blue-600/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600/30" />
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Insights;
