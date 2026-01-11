import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../authentication/services/authService';

export default function useForgotPassword() {
  const {
    isLoading: isSentCode,
    mutate: sentCode,
    data,
    error,
  } = useMutation({
    mutationFn: forgotPassword,
  });
  return { isSentCode, sentCode, data, error };
}
