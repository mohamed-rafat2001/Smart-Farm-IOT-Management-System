'use client';

//eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

function LoadingCircul() {
  const dotVariants = {
    jump: {
      y: -24,
      scale: [1, 1.2, 1],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        className="flex items-center gap-4"
        initial="initial"
        animate="jump"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            variants={dotVariants}
            transition={{
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="text-[10px] font-black tracking-[0.4em] text-stone-500 uppercase"
      >
        Initializing System
      </motion.p>
    </div>
  );
}

export default LoadingCircul;
