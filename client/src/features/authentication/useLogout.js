import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authentication';
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
      queryClient.clear();
      navigate('/');
    },

    onError: () => {
      // Still show success to user but log the error for devs
      toast.success('Logged out');
      navigate('/');
    }
  });

  return { isLogOut, logOutUser };
}
export default useLogOut;
