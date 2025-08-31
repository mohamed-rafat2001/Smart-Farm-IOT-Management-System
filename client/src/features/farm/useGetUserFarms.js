import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userFarms } from '../../services/farm';

function useGetUserFarms() {
  const queryClient = useQueryClient();
  
  // Get the current user data from the cache
  const userData = queryClient.getQueryData(['User']);
  conso.log(userData)
  const {
    data: userFarm,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userFarms', userData?._id], // Include user ID in the query key for proper cache isolation
    queryFn: userFarms,
    // Don't use cached data if there's no authenticated user
    enabled: !!userData,
    // Ensure stale data isn't shown while new data is loading
    keepPreviousData: false,
    // Reset the query when user changes
    onError: () => {
      queryClient.setQueryData(['userFarms', userData?._id], { data: { docs: [] } });
    }
  });

  return { userFarm: userFarm?.data, isLoading, error };
}

export default useGetUserFarms;
