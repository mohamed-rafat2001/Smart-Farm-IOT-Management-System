import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const useImageUpload = (options = {}) => {
  const {
    uploadFunction, // The actual upload function (e.g., userImg, farmImg)
    onSuccess, // Custom success callback
    onError, // Custom error callback
    maxFileSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/*'], // Default to all images
    autoCloseModal = true, // Auto close modal on success
    showProgress = true, // Show upload progress
    resetOnSuccess = true, // Reset form on successful upload
  } = options;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Watch the file input
  const photoFile = watch('photo');

  // Handle file selection with validation
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const file = photoFile[0];

      // Validate file type
      const isValidType = allowedTypes.some((type) => {
        if (type === 'image/*') return file.type.startsWith('image/');
        return file.type === type;
      });

      if (!isValidType) {
        setUploadStatus(
          `Error: Please select a valid file type. Allowed: ${allowedTypes.join(', ')}`
        );
        setSelectedFile(null);
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        const maxSizeMB = (maxFileSize / 1024 / 1024).toFixed(1);
        setUploadStatus(`Error: File size must be less than ${maxSizeMB}MB`);
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setUploadStatus('File selected: ' + file.name);
    }
  }, [photoFile, allowedTypes, maxFileSize]);

  // Submit function
  const submit = useCallback(
    async (image) => {
      if (!image.photo || !image.photo[0]) {
        setUploadStatus('Error: No file selected');
        return;
      }

      const file = image.photo[0];

      // Double-check validation
      const isValidType = allowedTypes.some((type) => {
        if (type === 'image/*') return file.type.startsWith('image/');
        return file.type === type;
      });

      if (!isValidType) {
        setUploadStatus(`Error: Please select a valid file type`);
        return;
      }

      if (file.size > maxFileSize) {
        setUploadStatus(
          `Error: File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(1)}MB`
        );
        return;
      }

      const formData = new FormData();
      formData.append('photo', file);

      setUploadStatus('Uploading...');
      setIsUploading(true);
      setUploadProgress(0);

      if (autoCloseModal) {
        setModalOpen(false);
      }

      try {
        const result = await uploadFunction(formData, {
          onUploadProgress: showProgress
            ? (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              }
            : undefined,
        });

        setUploadedImageUrl(
          result?.profileImg?.secure_url || result?.imageUrl || result?.url
        );
        setUploadStatus('Upload successful!');
        setIsUploading(false);
        setUploadProgress(0);

        if (resetOnSuccess) {
          reset();
          setSelectedFile(null);
        }

        // Call custom success callback
        if (onSuccess) {
          onSuccess(result);
        }

        // Don't auto clear success message - keep it visible
        // setTimeout(() => setUploadStatus(''), 3000);
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadStatus(`Upload failed: ${error.message || 'Unknown error'}`);
        setIsUploading(false);
        setUploadProgress(0);

        // Call custom error callback
        if (onError) {
          onError(error);
        }

        // Auto clear error message
        setTimeout(() => setUploadStatus(''), 5000);
      }
    },
    [
      uploadFunction,
      allowedTypes,
      maxFileSize,
      autoCloseModal,
      showProgress,
      resetOnSuccess,
      onSuccess,
      onError,
      reset,
    ]
  );

  // Open modal
  const openModal = useCallback(() => setModalOpen(true), []);

  // Close modal and reset form
  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedFile(null);
    setUploadStatus('');
    setUploadProgress(0);
    reset();
    // Don't reset uploadedImageUrl here - let it persist for UI update
  }, [reset]);

  // Reset upload state
  const resetUpload = useCallback(() => {
    setSelectedFile(null);
    setUploadStatus('');
    setUploadedImageUrl(null);
    setUploadProgress(0);
    reset();
  }, [reset]);

  // Clear upload state but keep uploaded image URL
  const clearUploadState = useCallback(() => {
    setSelectedFile(null);
    setUploadStatus('');
    setUploadProgress(0);
    reset();
    // Keep uploadedImageUrl for UI display
  }, [reset]);

  // Get file info for display
  const getFileInfo = useCallback(() => {
    if (!selectedFile) return null;

    return {
      name: selectedFile.name,
      size: (selectedFile.size / 1024 / 1024).toFixed(2),
      type: selectedFile.type,
      lastModified: new Date(selectedFile.lastModified).toLocaleDateString(),
    };
  }, [selectedFile]);

  // Check if file is valid
  const isFileValid =
    selectedFile &&
    allowedTypes.some((type) => {
      if (type === 'image/*') return selectedFile.type.startsWith('image/');
      return selectedFile.type === type;
    }) &&
    selectedFile.size <= maxFileSize;

  // Validation helper
  const validateFile = useCallback(
    (file) => {
      if (!file) return 'No file selected';

      const isValidType = allowedTypes.some((type) => {
        if (type === 'image/*') return file.type.startsWith('image/');
        return file.type === type;
      });

      if (!isValidType)
        return `Please select a valid file type. Allowed: ${allowedTypes.join(', ')}`;
      if (file.size > maxFileSize)
        return `File size must be less than ${(maxFileSize / 1024 / 1024).toFixed(1)}MB`;

      return null; // Valid
    },
    [allowedTypes, maxFileSize]
  );

  return {
    // Form handling
    register,
    handleSubmit,
    errors,

    // State
    selectedFile,
    uploadStatus,
    isModalOpen,
    uploadedImageUrl,
    isUploading,
    isFileValid,
    uploadProgress,

    // Actions
    submit,
    openModal,
    closeModal,
    resetUpload,
    clearUploadState,

    // Utilities
    getFileInfo,
    validateFile,

    // Configuration
    maxFileSize,
    allowedTypes,
    showProgress,
  };
};

export default useImageUpload;
