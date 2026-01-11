import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../authentication/services/authService';
import { useNavigate } from 'react-router-dom';

export default function useResetPassword() {
  const navigate = useNavigate();
  const {
    isLoading: isResetPassword,
    error,
    mutate: resetUserPassword,
    data: updatedData,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate('/app');
    },
  });
  return { isResetPassword, error, resetUserPassword, updatedData };
}

