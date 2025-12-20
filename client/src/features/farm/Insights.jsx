import { motion } from 'framer-motion';

const Insights = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-10"
    >
      <header>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Farm Insights</h1>
        <p className="mt-2 text-stone-400">
          Analyze your farm's performance, resource usage, and growth metrics.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Cards for Insights */}
        {[
          { title: 'Soil Moisture', value: '42%', trend: '+5%', color: 'blue' },
          { title: 'Avg Temperature', value: '24°C', trend: '-2%', color: 'orange' },
          { title: 'Humidity Level', value: '65%', trend: '+1%', color: 'green' },
          { title: 'Water Usage', value: '1.2k L', trend: '-10%', color: 'cyan' },
          { title: 'Crop Health', value: 'Optimal', trend: 'Stable', color: 'emerald' },
          { title: 'Battery Levels', value: '88%', trend: '-5%', color: 'yellow' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-stone-700/50 bg-[#283039]/30 p-6 shadow-xl transition-all hover:border-blue-500/50 hover:bg-[#283039]/50"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500">
                {stat.title}
              </h3>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${
                stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 
                stat.trend.startsWith('-') ? 'bg-red-500/10 text-red-500' : 
                'bg-blue-500/10 text-blue-500'
              }`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <div className={`h-10 w-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                 <div className={`h-2 w-2 rounded-full bg-${stat.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={itemVariants}
        className="rounded-2xl border border-stone-700/50 bg-[#283039]/30 p-8 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-500">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-bold text-white">Advanced Analytics Coming Soon</h3>
        <p className="mx-auto mt-2 max-w-md text-stone-400">
          We're working on deep learning models to provide more accurate predictions for your farm's health and yield.
        </p>
      </motion.div>
    </motion.div>
  );
};
export default Insights;
