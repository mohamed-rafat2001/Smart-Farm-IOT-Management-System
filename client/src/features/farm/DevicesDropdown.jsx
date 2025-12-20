import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useUpdateFirebaseData from './useUpdateFirebaseData';

function DevicesDropdown({ el, firebaseUrl }) {
  const { updateData, isUpdating } = useUpdateFirebaseData(firebaseUrl);

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        height: { duration: 0.4, ease: "easeOut" },
        opacity: { duration: 0.3, delay: 0.1 },
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        height: { duration: 0.3, ease: "easeIn" },
        opacity: { duration: 0.2 }
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="overflow-hidden border-t border-stone-800/50 bg-[#1b2127]/40 backdrop-blur-sm"
    >
      <div className="p-8">
        <div className="mb-6 grid grid-cols-3 gap-6 border-b border-stone-800/50 pb-4">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-500">
            Property
          </h4>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-stone-500">
            Current Value
          </h4>
          <h4 className="text-center text-xs font-black uppercase tracking-[0.2em] text-stone-500">
            Action
          </h4>
        </div>

        <div className="space-y-1">
          {Object.entries(el)
            .filter(([key]) => !['name', 'Auto_change'].includes(key))
            .map(([key, value]) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="group grid grid-cols-3 items-center gap-6 rounded-xl px-4 py-3 transition-all duration-300 hover:bg-[#283039]/40"
              >
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.3)] group-hover:bg-blue-500" />
                  <span className="text-sm font-bold capitalize text-stone-300 group-hover:text-white">
                    {key.replace(/_/g, ' ')}
                  </span>
                </div>

                <div>
                  <span className="inline-flex items-center rounded-lg bg-[#1b2127]/60 px-3 py-1 text-sm font-medium text-blue-400 border border-stone-800/50">
                    {typeof value === 'object'
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </div>

                <div className="flex justify-center">
                  {typeof value === 'boolean' ? (
                    <button
                      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2 text-[10px] font-black tracking-widest transition-all duration-500 ${
                        value
                          ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                          : 'bg-stone-800/50 text-stone-400 hover:bg-stone-700 hover:text-white'
                      } shadow-sm active:scale-95 disabled:opacity-50`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateData({
                          path: `${el.name}/${key}`,
                          data: !value
                        });
                      }}
                      disabled={isUpdating}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        value ? 'bg-green-500 group-hover:bg-white' : 'bg-stone-500 group-hover:bg-white'
                      }`} />
                      {value ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  ) : (
                    <span className="text-[10px] font-black tracking-widest text-stone-600">
                      READ ONLY
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default DevicesDropdown;
