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
      queryClient.removeQueries({ queryKey: ['User'] });
      queryClient.removeQueries({ queryKey: ['userFarms'] });
      queryClient.clear();
      navigate('/');
    },
  });

  return { isLogOut, logOutUser };
}
export default useLogOut;
