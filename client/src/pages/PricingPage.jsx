import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PricingMonthly from '../features/Home/PricingMonthly';
import PricingYearly from '../features/Home/PricingYearly';

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

function PricingPage() {
  const [active, setActive] = useState('monthly');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pb-20 w-full overflow-x-hidden"
    >
      {/* Pricing Header Section */}
      <section className="px-6 pt-20 pb-16">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg sm:text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Choose the plan that's right for your farm. No hidden fees, just straightforward agricultural intelligence.
            </p>
          </motion.div>

          {/* Pricing Toggle */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-center gap-4 bg-[#283039]/50 p-1 rounded-2xl border border-stone-700/50"
          >
            <button
              className={`relative px-8 py-3 text-sm font-bold transition-all duration-300 rounded-xl ${
                active === 'monthly' ? 'text-white' : 'text-stone-500 hover:text-stone-300'
              }`}
              onClick={() => setActive('monthly')}
            >
              {active === 'monthly' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              className={`relative px-8 py-3 text-sm font-bold transition-all duration-300 rounded-xl ${
                active === 'yearly' ? 'text-white' : 'text-stone-500 hover:text-stone-300'
              }`}
              onClick={() => setActive('yearly')}
            >
              {active === 'yearly' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative z-10">Yearly</span>
              {active !== 'yearly' && (
                <span className="absolute -top-3 -right-2 bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20">
                  Save 20%
                </span>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {active === 'monthly' ? <PricingMonthly /> : <PricingYearly />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ Link or Trust Badge Section */}
      <motion.div 
        variants={itemVariants}
        className="mt-24 text-center px-6"
      >
        <p className="text-stone-500">
          Have questions? Check our <a href="#" className="text-blue-500 hover:underline">FAQ</a> or <a href="/contact" className="text-blue-500 hover:underline">contact our sales team</a>.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default PricingPage;
