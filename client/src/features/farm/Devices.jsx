import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Table from '../../ui/Table';
import SelectFarm from './SelectFarm';
import useDevices from './useDevices';
import DevicesDropdown from './DevicesDropdown';
import useUpdateFirebaseData from './useUpdateFirebaseData';
import LoadingCircul from '../../ui/LoadingCircul.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

function Devices() {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const firebaseUrl = selectedFarm?.firebaseUrl;
  const { Devices, isGetDevices } = useDevices(firebaseUrl);
  const { updateData, isUpdating } = useUpdateFirebaseData(firebaseUrl);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const devicesList = [];
  if (Devices) {
    Object.keys(Devices).forEach((key) => {
      devicesList.push({ name: key, ...Devices[key] });
    });
  }

  const toggleRow = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative space-y-12 pb-10"
    >
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-24 -left-24 -z-10 h-96 w-96 rounded-full bg-purple-600/5 blur-[120px]" />

      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Connected Devices<span className="text-blue-500">.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-stone-400">
            Manage and monitor your farm's IoT infrastructure. Real-time status
            updates and manual control overrides.
          </p>
        </div>
        {selectedFarm && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, x: 20 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-600/10 px-6 py-3 backdrop-blur-md"
          >
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <span className="text-sm font-black tracking-widest text-blue-400 uppercase">
              {selectedFarm.name}
            </span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="max-w-md rounded-[2.5rem] border border-stone-800/50 bg-[#283039]/30 p-8 shadow-2xl backdrop-blur-sm"
      >
        <SelectFarm onFarmSelect={setSelectedFarm} />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div className="ml-2 flex items-center gap-4">
          <div className="h-8 w-2 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          <h2 className="text-2xl font-black text-white">Device List</h2>
        </div>

        {isGetDevices ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-[3rem] border border-stone-800/50 bg-[#283039]/20 backdrop-blur-sm">
            <LoadingCircul />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {Devices ? (
              <motion.div
                key="devices-table"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#1b2127]/40 shadow-2xl backdrop-blur-sm"
              >
                <Table head={['Device', 'Control Mode']}>
                  {devicesList?.map((el, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className={`group cursor-pointer transition-all duration-500 ${
                          expandedRows.has(index)
                            ? 'bg-blue-600/10'
                            : 'border-b border-stone-800/30 hover:bg-white/5'
                        }`}
                        onClick={() => toggleRow(index)}
                      >
                        <td className="p-6 sm:p-8">
                          <div className="flex items-center gap-6">
                            <motion.div
                              animate={{
                                rotate: expandedRows.has(index) ? 90 : 0,
                                scale: expandedRows.has(index) ? 1.2 : 1,
                              }}
                              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                                expandedRows.has(index)
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                  : 'bg-stone-800/50 text-stone-500 group-hover:bg-stone-700 group-hover:text-stone-300'
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
                                  strokeWidth={3}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </motion.div>
                            <div className="flex flex-col">
                              <span
                                className={`text-lg font-black transition-colors duration-300 ${
                                  expandedRows.has(index)
                                    ? 'text-white'
                                    : 'text-stone-300 group-hover:text-white'
                                }`}
                              >
                                {el.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-1.5 w-1.5 rounded-full ${el?.Status === 'online' || !el?.Status ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-stone-600'}`}
                                />
                                <span
                                  className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${el?.Status === 'online' || !el?.Status ? 'text-green-500' : 'text-stone-500'}`}
                                >
                                  {el?.Status || 'active'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-center sm:p-8">
                          <button
                            className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-6 py-3 text-xs font-black tracking-widest transition-all duration-500 ${
                              el?.Auto_change
                                ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white'
                                : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white'
                            } shadow-sm active:scale-95 disabled:opacity-50`}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateData({
                                path: `${el.name}/Auto_change`,
                                data: !el?.Auto_change,
                              });
                            }}
                            disabled={isUpdating}
                          >
                            <span
                              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                                el?.Auto_change
                                  ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] group-hover:bg-white'
                                  : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)] group-hover:bg-white'
                              }`}
                            />
                            {el?.Auto_change ? 'AUTOMATIC' : 'MANUAL'}
                          </button>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedRows.has(index) && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-blue-600/[0.03]"
                          >
                            <td colSpan="2" className="p-0">
                              <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="p-8 sm:p-12"
                              >
                                <DevicesDropdown
                                  el={el}
                                  index={index}
                                  firebaseUrl={firebaseUrl}
                                />
                              </motion.div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </Table>
              </motion.div>
            ) : (
              <motion.div
                key="no-devices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative flex flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-dashed border-stone-800/50 bg-[#283039]/20 py-24 text-center backdrop-blur-sm"
              >
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-stone-800/10 blur-[80px]" />

                <div className="relative z-10 space-y-6">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-stone-800/50 text-stone-600">
                    <svg
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-stone-300">
                      No Devices Found
                    </h3>
                    <p className="mx-auto max-w-xs font-bold text-stone-500">
                      Please select a farm to view connected devices and their
                      current status.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Devices;
