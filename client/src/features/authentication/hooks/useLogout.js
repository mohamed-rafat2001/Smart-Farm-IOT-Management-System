import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../services/authService';
import toast from 'react-hot-toast';

function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogOut, mutate: logOutUser } = useMutation({
    mutationFn: logOut,

    onSuccess: () => {
      toast.success('Logged out successfully');
    },

    onSettled: () => {
      // Always cleanup and navigate even if the request fails
      queryClient.removeQueries({ queryKey: ['User'] });
      queryClient.removeQueries({ queryKey: ['userFarms'] });
      queryClient.invalidateQueries();
      queryClient.clear();

      // Clear any potential non-httpOnly cookies just in case
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      navigate('/', { replace: true });
    },

    onError: () => {
      // Still show success to user but log the error for devs
      toast.success('Logged out');

      // Force cleanup even on error
      queryClient.clear();
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      navigate('/', { replace: true });
    },
  });

  return { isLogOut, logOutUser };
}
export default useLogOut;
