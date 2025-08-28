import useAuth from '../../Hooks/useAuth';
import defaultProfileImg from '../../assets/defaultProfileImage.jpeg';
import useImageUpload from './useImageUpload.js';
import ImageUploadModal from '../../ui/ImageUploadModal.jsx';
import CurrentImageModal from '../../ui/CurrentImageModal.jsx';
import { useEffect, useState, useRef } from 'react';
import { userImg } from '../../services/user';

function ProfileHeader() {
  const { data } = useAuth();
  const [userProfileImg, setUserProfileImg] = useState(
    data?.profileImg?.secure_url
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCurrentImageModalOpen, setIsCurrentImageModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    uploadStatus,
    isModalOpen,
    uploadedImageUrl,
    isUploading,
    isFileValid,
    submit,
    openModal,
    closeModal,
    getFileInfo,
    uploadProgress,
    register,
    handleSubmit,
    errors,
    selectedFile,
  } = useImageUpload({
    uploadFunction: userImg,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/*'],
    autoCloseModal: false, // Keep modal open to show progress
    showProgress: true,
    resetOnSuccess: false, // Don't reset form automatically
    onSuccess: (result) => {
      // Update the local state immediately for UI update
      if (result?.profileImg?.secure_url) {
        setUserProfileImg(result.profileImg.secure_url);
      }
      // Don't auto-close modal - let user close it manually
    },
    onError: (error) => {
      // Show user-friendly error message
      if (
        error.message.includes('Network Error') ||
        error.message.includes('No response from server')
      ) {
        // The hook will automatically handle error display
      }
      // The hook will automatically handle error display
    },
  });

  // Update profile image when data changes
  useEffect(() => {
    setUserProfileImg(data?.profileImg?.secure_url);
  }, [data?.profileImg?.secure_url]);

  // Update profile image when upload is successful
  useEffect(() => {
    if (uploadedImageUrl) {
      setUserProfileImg(uploadedImageUrl);
    }
  }, [uploadedImageUrl]);

  // Also update when the hook's uploadedImageUrl changes
  useEffect(() => {
    if (uploadedImageUrl && uploadedImageUrl !== userProfileImg) {
      setUserProfileImg(uploadedImageUrl);
    }
  }, [uploadedImageUrl, userProfileImg]);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewCurrentImage = () => {
    setIsCurrentImageModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleAddNewImage = () => {
    openModal();
    setIsDropdownOpen(false);
  };

  const handleUploadModalClose = () => {
    // Only close if upload is not in progress
    if (!isUploading) {
      // Don't clear the upload state immediately - let the success message stay visible
      // The image should already be updated in the UI
      closeModal();
    }
  };

  const handleCurrentImageModalClose = () => {
    setIsCurrentImageModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-x-7 min-[450px]:flex-row">
      <div className="relative mb-3 h-30 w-30">
        <img
          src={userProfileImg ? userProfileImg : defaultProfileImg}
          className={`h-[100%] w-[100%] cursor-pointer rounded-full border-2 object-cover transition-all duration-200 hover:border-amber-300 ${
            isUploading ? 'border-blue-400 opacity-75' : 'border-gray-200'
          }`}
          alt="Profile"
          onClick={handleImageClick}
        />

        {/* Loading indicator overlay */}
        {isUploading && (
          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-full bg-black">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {/* Success indicator overlay */}
        {uploadStatus?.includes('successful') && !isUploading && (
          <div className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <div className="py-1">
              <button
                onClick={handleViewCurrentImage}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Current Image
              </button>
              <button
                onClick={handleAddNewImage}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Image
              </button>
            </div>
          </div>
        )}

        {/* Upload Modal - Stays open until user closes it */}
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={handleUploadModalClose}
          onSubmit={submit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          selectedFile={selectedFile}
          uploadStatus={uploadStatus}
          isUploading={isUploading}
          isFileValid={isFileValid}
          getFileInfo={getFileInfo}
          uploadProgress={uploadProgress}
          uploadedImageUrl={uploadedImageUrl}
        />

        {/* Current Image Modal */}
        <CurrentImageModal
          isOpen={isCurrentImageModalOpen}
          onClose={handleCurrentImageModalClose}
          imageUrl={userProfileImg}
          userName={`${data?.firstName} ${data?.lastName}`}
        />
      </div>

      <div className="mb-3 min-[450px]:mt-5">
        <h1 className="text-xl font-bold text-white">
          {data?.firstName + '  ' + data?.lastName}
        </h1>
        <p className="text-xs text-stone-400">{data?.email}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
