import { motion } from 'framer-motion';
import { useState } from 'react';
import useAdminStats from '../hooks/useAdminStats';
import StatsCard from './StatsCard';
import UserManagement from '../hooks/useAdminUsers';
import { FarmManagement } from '../../farm';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, isLoading } = useAdminStats();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'farms', label: 'Farm Management', icon: '🏡' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-black tracking-tight text-white">
          Admin Dashboard<span className="text-blue-500">.</span>
        </h1>
        <p className="mt-2 text-lg text-stone-400">
          Manage users, farms, and monitor system health
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-3 overflow-x-auto rounded-2xl border border-stone-800/50 bg-[#1b2127]/30 p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-800 border-t-blue-500" />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  icon={
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  }
                  title="Total Users"
                  value={stats?.totalUsers}
                  color="blue"
                />
                <StatsCard
                  icon={
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  title="Active Users"
                  value={stats?.activeUsers}
                  color="green"
                />
                <StatsCard
                  icon={
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
                  }
                  title="Total Farms"
                  value={stats?.totalFarms}
                  color="purple"
                />
                <StatsCard
                  icon={
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  }
                  title="Active Farms"
                  value={stats?.activeFarms}
                  color="orange"
                />
              </div>
            )}

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Users */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl border border-stone-800/50 bg-[#1b2127]/30 p-6"
              >
                <h3 className="mb-4 text-xl font-black text-white">
                  Recent Users
                </h3>
                <div className="space-y-3">
                  {stats?.recentUsers?.slice(0, 5).map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center gap-4 rounded-2xl border border-stone-800/30 bg-stone-900/20 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-black text-blue-500">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-stone-500">{user.email}</p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}
                      >
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Farms */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl border border-stone-800/50 bg-[#1b2127]/30 p-6"
              >
                <h3 className="mb-4 text-xl font-black text-white">
                  Recent Farms
                </h3>
                <div className="space-y-3">
                  {stats?.recentFarms?.slice(0, 5).map((farm) => (
                    <div
                      key={farm._id}
                      className="flex items-center gap-4 rounded-2xl border border-stone-800/30 bg-stone-900/20 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
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
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">{farm.name}</p>
                        <p className="text-sm text-stone-500">
                          {farm.location}
                        </p>
                      </div>
                      <span
                        className={`h-2 w-2 rounded-full ${farm.active ? 'animate-pulse bg-green-500' : 'bg-red-500'}`}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'farms' && <FarmManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
