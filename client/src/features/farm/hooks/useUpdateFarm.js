import { useMutation } from '@tanstack/react-query';
import { updateFarm } from '../services/farmService';
import useSingleFarm from '../hooks/useSingleFarm';

function useUpdateFarm() {
  const { farm } = useSingleFarm();
  const {
    isLoading: isUpdated,
    data: updatedData,
    error,
    mutate: update,
  } = useMutation({
    mutationFn: (data) => updateFarm(farm._id, data),
  });
  return { isUpdated, updatedData, error, update };
}

export default useUpdateFarm;

