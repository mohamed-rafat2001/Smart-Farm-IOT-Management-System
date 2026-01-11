import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../services/adminService';
import toast from 'react-hot-toast';

export default function useAdminUsers() {
  const queryClient = useQueryClient();

  // Get all users
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: getAllUsers,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('User created successfully!');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to create user');
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('User updated successfully!');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to update user');
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('User deleted successfully!');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to delete user');
    },
  });

  return {
    users: usersData?.data?.docs || [],
    totalUsers: usersData?.data?.results || 0,
    isLoading,
    error,
    createUser: createUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
    deleteUser: deleteUserMutation.mutate,
    isDeleting: deleteUserMutation.isPending,
  };
}
