import { getMe } from '../services/user';
import { useQuery } from '@tanstack/react-query';
function useAuth() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['User'],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  return {
    isLoading,
    data,
    isAuthenticated: Boolean(data),
    error,
  };
}
export default useAuth;
