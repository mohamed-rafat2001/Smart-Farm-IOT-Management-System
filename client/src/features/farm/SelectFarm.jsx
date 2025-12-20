import { useState,useEffect } from 'react';
import useGetUserFarms from './useGetUserFarms';

import { motion, AnimatePresence } from 'framer-motion';

function SelectFarm({ onFarmSelect }) {
  const { userFarm } = useGetUserFarms();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState();
  
  const handleSelect = (farm) => {
    setSelectedFarm(farm);
    setIsOpen(false);
    if (onFarmSelect) {
      onFarmSelect(farm);
    }
  };
  
  useEffect(() => {
    if (!selectedFarm && userFarm?.docs?.[0]) {
      onFarmSelect(userFarm.docs[0]);
    }
  }, [userFarm, selectedFarm, onFarmSelect]);

  const farms = userFarm?.docs || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white sm:text-2xl">Select your farm</h2>
      <div className="relative w-full max-w-md">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-stone-700/50 bg-[#283039]/30 p-3.5 text-left transition-all hover:border-blue-500/50 hover:bg-[#283039]/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-stone-200">
            {selectedFarm ? selectedFarm.name : farms[0] ? farms[0].name : 'No farms found'}
          </span>
          <svg
            className={`h-5 w-5 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-20 mt-2 max-h-60 w-full overflow-hidden rounded-xl border border-stone-700 bg-[#1b2127] shadow-2xl backdrop-blur-xl"
            >
              <div className="overflow-y-auto p-1 custom-scrollbar">
                {farms.length > 0 ? (
                  farms.map((farm) => (
                    <button
                      key={farm._id}
                      type="button"
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        (selectedFarm?._id || farms[0]?._id) === farm._id
                          ? 'bg-blue-600 text-white'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                      onClick={() => handleSelect(farm)}
                    >
                      <span className={`h-2 w-2 rounded-full ${(selectedFarm?._id || farms[0]?._id) === farm._id ? 'bg-white' : 'bg-stone-600'}`} />
                      {farm.name}
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-stone-500">
                    No farms available
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
export default SelectFarm;
