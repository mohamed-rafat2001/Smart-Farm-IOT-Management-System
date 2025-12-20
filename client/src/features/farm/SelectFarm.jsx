import { useState, useEffect } from 'react';
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
      <h2 className="ml-1 text-sm font-bold tracking-[0.2em] text-stone-500 uppercase">
        Select your farm
      </h2>
      <div className="relative w-full">
        <button
          type="button"
          className="group flex w-full items-center justify-between rounded-2xl border border-stone-800/50 bg-[#1b2127]/80 p-4 text-left transition-all duration-300 hover:border-stone-700 hover:bg-[#1b2127] focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${selectedFarm || farms[0] ? 'bg-blue-600/10 text-blue-500' : 'bg-stone-800 text-stone-500'}`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">
              {selectedFarm
                ? selectedFarm.name
                : farms[0]
                  ? farms[0].name
                  : 'No farms found'}
            </span>
          </div>
          <svg
            className={`h-6 w-6 text-stone-500 transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-stone-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-50 mt-3 max-h-80 w-full overflow-hidden rounded-[2rem] border border-stone-800 bg-[#1b2127]/95 p-2 shadow-2xl backdrop-blur-xl"
            >
              <div className="custom-scrollbar max-h-72 space-y-1 overflow-y-auto">
                {farms.length > 0 ? (
                  farms.map((farm) => (
                    <button
                      key={farm._id}
                      type="button"
                      className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-200 ${
                        (selectedFarm?._id || farms[0]?._id) === farm._id
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                          : 'text-stone-400 hover:bg-white/5 hover:text-white'
                      }`}
                      onClick={() => handleSelect(farm)}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                          (selectedFarm?._id || farms[0]?._id) === farm._id
                            ? 'bg-white/20 text-white'
                            : 'bg-stone-800 text-stone-500 group-hover:bg-stone-700 group-hover:text-blue-400'
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">{farm.name}</span>
                        <span
                          className={`text-xs ${
                            (selectedFarm?._id || farms[0]?._id) === farm._id
                              ? 'text-blue-100'
                              : 'text-stone-500'
                          }`}
                        >
                          {farm.location || 'Unknown location'}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-stone-500">
                    <svg
                      className="h-12 w-12 opacity-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p className="mt-2 text-sm font-medium">
                      No farms available
                    </p>
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
