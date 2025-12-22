import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalDetails from './PersonalDetails';
import UpdatePassword from './UpdatePassword';

function ProfileContent() {
  const [Default, setDefault] = useState(true);
  return (
    <div className="mt-12">
      <div className="mb-10 flex flex-wrap gap-4 border-b border-stone-700/50 pb-px">
        <button
          type="button"
          className={`relative px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
            Default
              ? 'text-blue-500'
              : 'rounded-t-2xl text-stone-400 hover:bg-stone-800/30 hover:text-stone-200'
          }`}
          onClick={() => setDefault(true)}
        >
          Personal Details
          {Default && (
            <motion.div
              layoutId="activeTab"
              className="absolute right-0 bottom-0 left-0 h-1 rounded-t-full bg-blue-500 shadow-[0_-4px_10px_rgba(59,130,246,0.3)]"
            />
          )}
        </button>
        <button
          type="button"
          className={`relative px-8 py-4 text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
            !Default
              ? 'text-blue-500'
              : 'rounded-t-2xl text-stone-400 hover:bg-stone-800/30 hover:text-stone-200'
          }`}
          onClick={() => setDefault(false)}
        >
          Update Password
          {!Default && (
            <motion.div
              layoutId="activeTab"
              className="absolute right-0 bottom-0 left-0 h-1 rounded-t-full bg-blue-500 shadow-[0_-4px_10px_rgba(59,130,246,0.3)]"
            />
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={Default ? 'personal' : 'password'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'circOut' }}
          className="rounded-[3rem] border border-stone-700/50 bg-[#283039]/30 p-8 shadow-2xl backdrop-blur-md lg:p-12"
        >
          {Default ? <PersonalDetails /> : <UpdatePassword />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ProfileContent;
