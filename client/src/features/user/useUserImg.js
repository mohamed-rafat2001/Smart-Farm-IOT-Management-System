import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userImg } from '../../services/user';

function useUserImg() {
  const queryClient = useQueryClient();

  const {
    error,
    mutate: uploadImg,
    isLoading: isUploaded,
    data: userData,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const data = await userImg(formData);
      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({
        queryKey: ['User'],
      });
      // Also invalidate any other related queries
      queryClient.invalidateQueries({
        queryKey: ['auth'],
      });
    },
    onError: (error) => {
      console.error('Image upload failed:', error);
    },
  });

  return {
    error,
    uploadImg,
    isUploaded,
    userData,
    isSuccess,
    isError,
  };
}

export default useUserImg;
