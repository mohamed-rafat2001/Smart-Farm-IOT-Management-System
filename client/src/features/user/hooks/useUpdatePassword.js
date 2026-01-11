import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../../authentication/services/authService';

function useUpdatePassword() {
  const {
    mutate: update,
    error,
    isLoading: isUpdated,
    data: updatedData,
  } = useMutation({
    mutationFn: updatePassword,
  });
  return { update, error, isUpdated, updatedData };
}
export default useUpdatePassword;
