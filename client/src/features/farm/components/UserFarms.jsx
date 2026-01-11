import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGetUserFarms from '../hooks/useGetUserFarms';
import Button from '../../../shared/components/Button';
import CreateFarm from './CreateFarm';
import Table from '../../../shared/components/Table.jsx';
import useDeactivateFarm from '../hooks/useDeactivateFarm';
import { useNavigate } from 'react-router-dom';
function UserFarms() {
  const navigate = useNavigate();
  const { userFarm } = useGetUserFarms();
  const [addFarm, setAddFarm] = useState(false);
  const { isDeactivate, deActive } = useDeactivateFarm();
  function handelEvent(id) {
    navigate(`/app/farms/${id}`);
  }
  function handelActiveButton(id) {
    deActive(id);
  }
  return (
    <div className="relative">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-white"
          >
            Your Farms<span className="text-blue-500">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-lg font-medium text-stone-400"
          >
            Manage and monitor all your agricultural assets from one place.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            className="group relative flex items-center gap-3 overflow-hidden !rounded-2xl bg-blue-600 !px-8 !py-4 !font-black text-white shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.05] hover:bg-blue-500 active:scale-95"
            onClick={() => setAddFarm(true)}
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add New Farm</span>
          </Button>
        </motion.div>
      </div>

      <div
        className={`${addFarm ? 'pointer-events-none blur-md' : ''} transition-all duration-500`}
      >
        {userFarm?.docs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#283039]/30 shadow-2xl backdrop-blur-sm"
          >
            <Table
              head={[
                'Farm Name',
                'Location',
                { label: 'Firebase URL', className: 'hidden lg:table-cell' },
                'Status',
              ]}
            >
              {userFarm.docs.map((el) => (
                <tr
                  onClick={() => handelEvent(el._id)}
                  key={el._id}
                  className="group cursor-pointer border-b border-stone-800/50 bg-transparent transition-all duration-300 hover:bg-blue-600/5"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-800/50 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <span className="text-lg font-bold text-white transition-colors group-hover:text-blue-400">
                        {el.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3 text-stone-400">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-800/30 text-stone-500">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">{el.location}</span>
                    </div>
                  </td>
                  <td className="hidden p-6 lg:table-cell">
                    <span className="font-mono text-sm text-stone-500 transition-colors group-hover:text-stone-300">
                      {el.firebaseUrl || 'N/A'}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center">
                      <button
                        disabled={isDeactivate}
                        onClick={(e) => {
                          e.stopPropagation();
                          handelActiveButton(el._id);
                        }}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase shadow-sm transition-all hover:scale-105 active:scale-95 ${
                          el.active
                            ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/20'
                            : 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${el.active ? 'animate-pulse bg-green-500' : 'bg-red-500'}`}
                        />
                        {el.active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {addFarm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setAddFarm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#1b2127] p-8 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Create New Farm
                  </h2>
                  <p className="text-stone-500">
                    Fill in the details to register your new farm.
                  </p>
                </div>
                <button
                  className="rounded-2xl bg-stone-800/50 p-3 text-stone-400 transition-all hover:bg-stone-700 hover:text-white"
                  onClick={() => setAddFarm(false)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <CreateFarm setAddFarm={setAddFarm} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default UserFarms;

