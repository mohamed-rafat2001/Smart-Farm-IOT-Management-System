import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/authentication';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading: isLogin,
    data,
    error,
    mutate: loginUser,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success('Welcome back!');
      
      // Clear any existing cache first
      queryClient.clear();
      
      // Set fresh user data
      queryClient.setQueryData(['User'], data);
      
      // Initialize empty farm data for the user
      queryClient.setQueryData(['userFarms'], { data: { docs: [] } });
      
      // Redirect to the page they were trying to access, or profile as default
      const from = location.state?.from || '/app/profile';
      navigate(from, { replace: true });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    },
  });
  return { isLogin, data, error, loginUser };
}
export default useLogin;
