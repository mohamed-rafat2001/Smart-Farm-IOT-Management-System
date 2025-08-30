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
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('✅ Token saved to localStorage');
      } else {
        console.warn('⚠️ No token received from server');
      }
      
      queryClient.setQueryData(['User'], data);
      navigate('/app/profile');
    },
  });
  return { isLogin, data, error, loginUser };
}
export default useLogin;
