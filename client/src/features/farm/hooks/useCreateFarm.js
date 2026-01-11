import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFarm } from '../services/farmService';
import toast from 'react-hot-toast';

function useCreateFarm() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isCreated,
    data: farm,
    error,
  } = useMutation({
    mutationFn: createFarm,
    onSuccess: () => {
      toast.success('Farm created successfully!');
      queryClient.invalidateQueries({ queryKey: ['userFarms'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create farm');
    },
  });
  return { create, isCreated, error, farm };
}
export default useCreateFarm;

