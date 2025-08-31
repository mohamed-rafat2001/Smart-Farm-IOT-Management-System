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
      
      // Set fresh user data
      queryClient.setQueryData(['User'], data);
      
      // Explicitly ensure userFarms cache is empty for new accounts
      queryClient.setQueryData(['userFarms'], { data: { docs: [] } });
      
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