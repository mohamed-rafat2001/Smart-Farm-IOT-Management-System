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
      className="space-y-8 pb-10"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Connected Devices
          </h1>
          <p className="mt-1 text-stone-400">
            Manage and monitor your farm's IoT infrastructure.
          </p>
        </div>
        {selectedFarm && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-600/10 px-4 py-2"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            <span className="text-sm font-bold text-blue-400">
              {selectedFarm.name}
            </span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-stone-700/50 bg-[#283039]/30 p-8 shadow-2xl backdrop-blur-sm"
      >
        <SelectFarm onFarmSelect={setSelectedFarm} />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="ml-1 flex items-center gap-2">
          <div className="h-6 w-1.5 rounded-full bg-blue-600" />
          <h2 className="text-xl font-bold text-white">Device List</h2>
        </div>

        {isGetDevices ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-[2rem] border border-stone-700/50 bg-[#283039]/20">
            <LoadingCircul />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {Devices ? (
              <motion.div
                key="devices-table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="overflow-hidden rounded-[2rem] border border-stone-700/50 bg-[#283039]/30 shadow-2xl"
              >
                <Table head={['Device', 'Control Mode']}>
                  {devicesList?.map((el, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className={`group cursor-pointer transition-all duration-300 ${
                          expandedRows.has(index)
                            ? 'bg-blue-600/5'
                            : 'border-b border-stone-700/30 hover:bg-stone-800/30'
                        }`}
                        onClick={() => toggleRow(index)}
                      >
                        <td className="p-5 sm:p-6">
                          <div className="flex items-center gap-4">
                            <motion.span
                              animate={{
                                rotate: expandedRows.has(index) ? 90 : 0,
                              }}
                              className={`transition-colors duration-300 ${expandedRows.has(index) ? 'text-blue-500' : 'text-stone-500 group-hover:text-stone-300'}`}
                            >
                              <svg
                                className="h-4 w-4"
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
                            </motion.span>
                            <span
                              className={`font-semibold transition-colors duration-300 ${expandedRows.has(index) ? 'text-white' : 'text-stone-300 group-hover:text-white'}`}
                            >
                              {el.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-5 text-center sm:p-6">
                          <button
                            className={`inline-flex items-center rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 ${
                              el?.Auto_change
                                ? 'border border-green-500/20 bg-green-500/10 text-green-500'
                                : 'border border-orange-500/20 bg-orange-500/10 text-orange-500'
                            } shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50`}
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
                              className={`mr-2 h-2 w-2 rounded-full ${el?.Auto_change ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]'}`}
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
                            className="border-b border-stone-700/30 bg-blue-600/5"
                          >
                            <td colSpan="2" className="p-0">
                              <motion.div
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                className="p-6 sm:p-8"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-stone-700/50 bg-[#283039]/20 py-20"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-800/50">
                  <svg
                    className="h-8 w-8 text-stone-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <p className="font-medium text-stone-400">
                  Please select a farm to view connected devices.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Devices;
