import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/authentication';

export function useSignUp() {
  const navigate = useNavigate();
  const location = useLocation();
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
      
      // Redirect to the page they were trying to access, or profile as default
      const from = location.state?.from || '/app/profile';
      navigate(from, { replace: true });
    },
  });

  return {
    isSignUp,
    error,
    data,
    mutate,
  };
}