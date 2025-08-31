import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/authentication';

export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isLoading: isSignUp,
    error,
    data,
    mutate,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      // Clear any existing cache first to ensure no data from previous sessions remains
      queryClient.clear();
      
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('✅ Token saved to localStorage after signup');
      } else {
        console.warn('⚠️ No token received from server after signup');
      }
      
      // Set fresh user data
      queryClient.setQueryData(['User'], data);
      
      // Explicitly ensure userFarms cache is empty for new accounts
      queryClient.setQueryData(['userFarms'], []);
      
      navigate('/app/profile');
    },
  });

  return {
    isSignUp,
    error,
    data,
    mutate,
  };
}
// i need you delete all locat storage from my client and server and only use cookies i already implemented