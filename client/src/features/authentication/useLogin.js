import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/authentication';
import { useNavigate } from 'react-router-dom';

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isLoading: isLogin,
    data,
    error,
    mutate: loginUser,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Clear any existing cache first
      queryClient.clear();
      
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('✅ Token saved to localStorage');
      } else {
        console.warn('⚠️ No token received from server');
      }
      
      // Set fresh user data
      queryClient.setQueryData(['User'], data);
      
      // Initialize empty farm data for the user
      queryClient.setQueryData(['userFarms'], { data: { docs: [] } });
      
      navigate('/app/profile');
    },
  });
  return { isLogin, data, error, loginUser };
}
export default useLogin;
