import { motion } from 'framer-motion';
import { useState } from 'react';
import useAdminUsers from '../hooks/useAdminUsers';
import Table from '../../../shared/components/Table';
import Button from '../../../shared/components/Button';

function UserManagement() {
  const { users, isLoading, deleteUser, isDeleting } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      deleteUser(userId);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500/10 text-purple-500 ring-purple-500/20';
      case 'user':
        return 'bg-blue-500/10 text-blue-500 ring-blue-500/20';
      default:
        return 'bg-stone-500/10 text-stone-500 ring-stone-500/20';
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
      {/* Header with search and filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users by name or email..."
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

        <div className="flex gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-2xl border border-stone-800/50 bg-[#1b2127]/50 px-4 py-3 text-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2.5rem] border border-stone-800/50 bg-[#283039]/30 shadow-2xl"
      >
        <Table
          head={[
            'User',
            'Email',
            'Role',
            { label: 'Phone', className: 'hidden lg:table-cell' },
            'Status',
            'Actions',
          ]}
        >
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-8 text-center text-stone-500">
                No users found
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="group border-b border-stone-800/50 transition-all hover:bg-blue-600/5"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-xl font-black text-blue-500">
                      {user.firstName?.[0]}
                      {user.lastName?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-stone-500">
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-stone-400">{user.email}</td>
                <td className="p-6">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-black tracking-wider uppercase ring-1 ${getRoleBadgeColor(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="hidden p-6 text-stone-400 lg:table-cell">
                  {user.phoneNumber || 'N/A'}
                </td>
                <td className="p-6">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase ${
                      user.active
                        ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/20'
                        : 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${user.active ? 'animate-pulse bg-green-500' : 'bg-red-500'}`}
                    />
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-6">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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
          <span className="font-bold text-white">{filteredUsers.length}</span>{' '}
          of <span className="font-bold text-white">{users.length}</span> users
        </p>
      </div>
    </div>
  );
}

export default UserManagement;
