import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllFarms, deleteFarm } from '../services/adminService';
import toast from 'react-hot-toast';

export default function useAdminFarms() {
  const queryClient = useQueryClient();

  // Get all farms
  const {
    data: farmsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['adminFarms'],
    queryFn: getAllFarms,
  });

  // Delete farm mutation
  const deleteFarmMutation = useMutation({
    mutationFn: deleteFarm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminFarms'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      toast.success('Farm deleted successfully!');
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to delete farm');
    },
  });

  return {
    farms: farmsData?.data?.docs || [],
    totalFarms: farmsData?.data?.results || 0,
    isLoading,
    error,
    deleteFarm: deleteFarmMutation.mutate,
    isDeleting: deleteFarmMutation.isPending,
  };
}
