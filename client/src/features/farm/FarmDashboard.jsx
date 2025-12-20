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
      className="space-y-10 pb-10"
    >
      <header>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-stone-400">
          Overview of your farm's performance and key metrics.
        </p>
      </header>

      <motion.div variants={itemVariants}>
        <SelectFarm onFarmSelect={() => {}} />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Stats */}
        {[
          { label: 'Active Devices', value: '12', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z' },
          { label: 'Alerts Today', value: '3', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'red' },
          { label: 'Uptime', value: '99.9%', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'green' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="rounded-2xl border border-stone-700/50 bg-[#283039]/30 p-6 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color || 'blue'}-500/10 text-${stat.color || 'blue'}-500`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-500">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-bold text-white">More insights are being prepared</h3>
        <p className="mx-auto mt-2 max-w-md text-stone-400">
          Once your devices start sending more data, you'll see detailed charts and predictions here.
        </p>
      </motion.div>
    </motion.div>
  );
}
export default FarmDashboard;
