import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../../services/authentication';
import toast from 'react-hot-toast';

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
      toast.success('Account created successfully! Welcome to Smart Farm.');
      
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
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to create account. Please try again.';
      toast.error(message);
    },
  });

  return {
    isSignUp,
    error,
    data,
    mutate,
  };
}