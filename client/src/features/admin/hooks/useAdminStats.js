import { useQuery } from '@tanstack/react-query';
import { getSystemStats } from '../services/adminService';

export default function useAdminStats() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['adminStats'],
    queryFn: getSystemStats,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 20000,
  });

  return {
    stats,
    isLoading,
    error,
    refetch,
  };
}
