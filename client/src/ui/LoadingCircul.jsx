'use client';

import { motion as Motion } from 'framer-motion';

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
      <Motion.div
        className="flex items-center gap-4"
        initial="initial"
        animate="jump"
      >
        {[0, 1, 2].map((i) => (
          <Motion.div
            key={i}
            className="h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            variants={dotVariants}
            transition={{
              delay: i * 0.2,
            }}
          />
        ))}
      </Motion.div>
      <Motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="text-[10px] font-black tracking-[0.4em] text-stone-500 uppercase"
      >
        Initializing System
      </Motion.p>
    </div>
  );
}

export default LoadingCircul;
