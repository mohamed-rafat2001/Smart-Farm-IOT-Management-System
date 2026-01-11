import { motion } from 'framer-motion';
import SelectFarm from './SelectFarm';

function FarmDashboard() {
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
      className="relative space-y-12 pb-10"
    >
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px]" />

      <header className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black tracking-tight text-white"
        >
          Farm Dashboard<span className="text-blue-500">.</span>
        </motion.h1>
        <p className="max-w-2xl text-lg leading-relaxed text-stone-400">
          Overview of your farm's performance and key metrics. Monitor real-time
          data from your connected devices.
        </p>
      </header>

      <motion.div variants={itemVariants} className="max-w-md">
        <SelectFarm onFarmSelect={() => {}} />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            label: 'Active Devices',
            value: '12',
            icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z',
            color: 'blue',
          },
          {
            label: 'Alerts Today',
            value: '3',
            icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
            color: 'red',
          },
          {
            label: 'System Uptime',
            value: '99.9%',
            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            color: 'green',
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#283039]/30 p-8 shadow-2xl backdrop-blur-sm transition-all hover:border-stone-700/50"
          >
            <div
              className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-${stat.color}-500/5 blur-2xl transition-all group-hover:bg-${stat.color}-500/10`}
            />

            <div className="flex items-center gap-6">
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-500 shadow-lg shadow-${stat.color}-500/10 transition-transform duration-500 group-hover:scale-110`}
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={stat.icon}
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black tracking-widest text-stone-500 uppercase">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[3rem] border border-stone-800/50 bg-[#283039]/20 p-12 text-center backdrop-blur-sm"
      >
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-600/5 blur-[100px]" />

        <div className="relative z-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-blue-600/10 text-blue-500 shadow-xl shadow-blue-500/5">
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
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          </div>
          <h3 className="mt-8 text-2xl font-black text-white">
            Advanced Insights are growing
            <span className="text-blue-500">.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-stone-400">
            Our AI is currently analyzing your farm's data. Once your devices
            collect more environmental information, we'll provide detailed
            predictions and growth optimizations.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-stone-800/50 bg-stone-900/50 px-5 py-2 text-sm font-bold text-stone-500">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
              Processing historical data
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FarmDashboard;
