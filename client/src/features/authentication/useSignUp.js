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
      // Save token to localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('✅ Token saved to localStorage after signup');
      } else {
        console.warn('⚠️ No token received from server after signup');
      }
      
      queryClient.setQueryData(['User'], data);
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