import { motion } from 'framer-motion';
import { useState } from 'react';
import useAdminFarms from '../hooks/useAdminFarms';
import Table from '../../../shared/components/Table';

function FarmManagement() {
  const { farms, isLoading, deleteFarm, isDeleting } = useAdminFarms();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFarms = farms.filter((farm) => {
    return (
      farm.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeleteFarm = (farmId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this farm? This action cannot be undone.'
      )
    ) {
      deleteFarm(farmId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-800 border-t-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search farms by name, location, or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-stone-800/50 bg-[#1b2127]/50 px-4 py-3 pl-12 text-white placeholder:text-stone-500 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
        />
        <svg
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-stone-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Farms table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#283039]/30 shadow-2xl"
      >
        <Table
          head={[
            'Farm Name',
            'Location',
            'Owner',
            { label: 'Firebase URL', className: 'hidden xl:table-cell' },
            'Status',
            'Actions',
          ]}
        >
          {filteredFarms.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-8 text-center text-stone-500">
                No farms found
              </td>
            </tr>
          ) : (
            filteredFarms.map((farm) => (
              <tr
                key={farm._id}
                className="group border-b border-stone-800/50 transition-all hover:bg-blue-600/5"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
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
                    <div>
                      <p className="font-bold text-white">{farm.name}</p>
                      <p className="text-sm text-stone-500">
                        ID: {farm._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-stone-400">
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
                    <span>{farm.location}</span>
                  </div>
                </td>
                <td className="p-6">
                  <div>
                    <p className="font-medium text-white">
                      {farm.userId?.firstName} {farm.userId?.lastName}
                    </p>
                    <p className="text-sm text-stone-500">
                      {farm.userId?.email}
                    </p>
                  </div>
                </td>
                <td className="hidden p-6 xl:table-cell">
                  <span className="font-mono text-sm text-stone-500">
                    {farm.firebaseUrl || 'N/A'}
                  </span>
                </td>
                <td className="p-6">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase ${
                      farm.active
                        ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/20'
                        : 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${farm.active ? 'animate-pulse bg-green-500' : 'bg-red-500'}`}
                    />
                    {farm.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-6">
                  <button
                    onClick={() => handleDeleteFarm(farm._id)}
                    disabled={isDeleting}
                    className="rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 ring-1 ring-red-500/20 transition-all hover:bg-red-500/20 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </Table>
      </motion.div>

      {/* Stats footer */}
      <div className="flex items-center justify-between rounded-2xl border border-stone-800/50 bg-[#1b2127]/30 p-6">
        <p className="text-sm text-stone-400">
          Showing{' '}
          <span className="font-bold text-white">{filteredFarms.length}</span>{' '}
          of <span className="font-bold text-white">{farms.length}</span> farms
        </p>
      </div>
    </div>
  );
}

export default FarmManagement;
