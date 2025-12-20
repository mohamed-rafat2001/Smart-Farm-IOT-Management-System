import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalDetails from './PersonalDetails';
import UpdatePassword from './UpdatePassword';

function ProfileContent() {
  const [Default, setDefault] = useState(true);
  return (
    <div className="mt-8">
      <div className="mb-8 flex flex-wrap gap-2 border-b border-stone-700/50 pb-px">
        <button
          type="button"
          className={`relative px-6 py-3 text-sm font-semibold transition-all ${
            Default
              ? 'text-blue-500'
              : 'rounded-t-xl text-stone-400 hover:bg-stone-800/50 hover:text-white'
          }`}
          onClick={() => setDefault(true)}
        >
          Personal Details
          {Default && (
            <motion.div
              layoutId="activeTab"
              className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-500"
            />
          )}
        </button>
        <button
          type="button"
          className={`relative px-6 py-3 text-sm font-semibold transition-all ${
            !Default
              ? 'text-blue-500'
              : 'rounded-t-xl text-stone-400 hover:bg-stone-800/50 hover:text-white'
          }`}
          onClick={() => setDefault(false)}
        >
          Update Password
          {!Default && (
            <motion.div
              layoutId="activeTab"
              className="absolute right-0 bottom-0 left-0 h-0.5 bg-blue-500"
            />
          )}
        </button>
      </div>

      <motion.div
        key={Default ? 'personal' : 'password'}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-stone-700 bg-[#1b2127] p-6 shadow-xl lg:p-8"
      >
        {Default ? <PersonalDetails /> : <UpdatePassword />}
      </motion.div>
    </div>
  );
}

export default ProfileContent;
