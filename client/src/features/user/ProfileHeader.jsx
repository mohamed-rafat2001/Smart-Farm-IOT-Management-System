import useAuth from '../../Hooks/useAuth';
import defaultProfileImg from '../../assets/defaultProfileImage.jpeg';
import useImageUpload from './useImageUpload.js';
import ImageUploadModal from '../../ui/ImageUploadModal.jsx';
import CurrentImageModal from '../../ui/CurrentImageModal.jsx';
import { useEffect, useState, useRef } from 'react';
import { userImg } from '../../services/user';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';

function ProfileHeader() {
  const { data } = useAuth();
  const queryClient = useQueryClient();
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
    autoCloseModal: true, // Auto close modal after successful upload
    showProgress: true,
    resetOnSuccess: true, // Reset form automatically
    onSuccess: (result) => {
      // Update the local state immediately for UI update
      if (result?.profileImg?.secure_url) {
        setUserProfileImg(result.profileImg.secure_url);

        // Directly update the React Query cache for the 'User' key
        queryClient.setQueryData(['User'], (oldData) => {
          if (!oldData) return result.user;
          return {
            ...oldData,
            profileImg: result.profileImg,
          };
        });
      }
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
    if (!isUploading) {
      closeModal();
    }
  };

  const handleCurrentImageModalClose = () => {
    setIsCurrentImageModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 flex w-full flex-col items-center gap-8 rounded-[3rem] border border-stone-700/50 bg-[#283039]/30 p-10 shadow-2xl backdrop-blur-md min-[450px]:flex-row min-[450px]:items-center"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/5 blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-600/5 blur-[100px]" />

      <div className="group relative z-10 h-40 w-40 shrink-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative h-full w-full"
        >
          <img
            src={userProfileImg ? userProfileImg : defaultProfileImg}
            className={`h-full w-full cursor-pointer rounded-[2.5rem] border-2 object-cover transition-all duration-500 ${
              isUploading
                ? 'border-blue-500 opacity-75'
                : 'border-stone-700/50 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]'
            } shadow-2xl`}
            alt="Profile"
            onClick={handleImageClick}
            loading="eager"
            decoding="async"
          />

          {/* Action Overlay on Hover */}
          <div
            onClick={handleImageClick}
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-[2.5rem] bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100"
          >
            <div className="translate-y-4 transform rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Action Button for Mobile accessibility */}
        <button
          onClick={handleImageClick}
          className="absolute -right-2 -bottom-2 z-30 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl transition-all hover:scale-110 hover:bg-blue-500 active:scale-95 sm:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
          </svg>
        </button>

        {/* Loading indicator overlay */}
        {isUploading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[2.5rem] bg-black/60 backdrop-blur-sm">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
          </div>
        )}

        {/* Success indicator overlay */}
        {uploadStatus?.includes('successful') && !isUploading && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-3 -right-3 z-20 rounded-2xl border-4 border-[#1b2127] bg-green-500 p-3 shadow-lg"
          >
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        )}

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              ref={dropdownRef}
              className="absolute top-full left-1/2 z-[9999] mt-4 w-72 -translate-x-1/2 overflow-hidden rounded-3xl border border-stone-700/50 bg-[#1b2127] shadow-2xl ring-1 ring-white/10"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={handleViewCurrentImage}
                  className="group/view relative flex w-full items-center gap-4 overflow-hidden rounded-2xl p-3 text-left transition-all hover:bg-white/5"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 transition-opacity group-hover/view:opacity-100" />

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-stone-400 shadow-inner transition-colors group-hover/view:bg-blue-600 group-hover/view:text-white">
                    <svg
                      className="h-5 w-5"
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
                  </div>

                  <div className="relative flex flex-col">
                    <span className="text-sm font-bold text-stone-200 group-hover/view:text-white">
                      View Photo
                    </span>
                    <span className="text-[10px] font-medium text-stone-500 group-hover/view:text-stone-400">
                      See current profile picture
                    </span>
                  </div>

                  <svg
                    className="ml-auto h-4 w-4 text-stone-600 opacity-0 transition-all group-hover/view:translate-x-1 group-hover/view:text-blue-500 group-hover/view:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="mx-2 h-px bg-stone-800" />

                <button
                  onClick={handleAddNewImage}
                  className="group/upload relative flex w-full items-center gap-4 overflow-hidden rounded-2xl p-3 text-left transition-all hover:bg-white/5"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent opacity-0 transition-opacity group-hover/upload:opacity-100" />

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-stone-400 shadow-inner transition-colors group-hover/upload:bg-green-600 group-hover/upload:text-white">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>

                  <div className="relative flex flex-col">
                    <span className="text-sm font-bold text-stone-200 group-hover/upload:text-white">
                      Upload New
                    </span>
                    <span className="text-[10px] font-medium text-stone-500 group-hover/upload:text-stone-400">
                      Change your profile picture
                    </span>
                  </div>

                  <svg
                    className="ml-auto h-4 w-4 text-stone-600 opacity-0 transition-all group-hover/upload:translate-x-1 group-hover/upload:text-green-500 group-hover/upload:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-10 flex-grow space-y-6 text-center min-[450px]:text-left">
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl"
          >
            {data?.firstName &&
            data?.lastName &&
            data.firstName.trim().toLowerCase() !==
              data.lastName.trim().toLowerCase()
              ? `${data.firstName} ${data.lastName}`
              : data?.firstName || 'User Profile'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-medium text-stone-400"
          >
            {data?.email}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 min-[450px]:justify-start"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-600/10 px-6 py-2.5 text-xs font-bold tracking-widest text-blue-400 uppercase shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
            Member since{' '}
            {data?.createdAt ? new Date(data.createdAt).getFullYear() : '2024'}
          </div>

          {(data?.role === 'admin' ||
            data?.role === 'tecSupport' ||
            data?.role === 'user') && (
            <div
              className={`inline-flex items-center gap-3 rounded-2xl border px-6 py-2.5 text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm ${
                data.role === 'admin'
                  ? 'border-purple-500/20 bg-purple-600/10 text-purple-400'
                  : data.role === 'tecSupport'
                    ? 'border-orange-500/20 bg-orange-600/10 text-orange-400'
                    : 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  data.role === 'admin'
                    ? 'bg-purple-500'
                    : data.role === 'tecSupport'
                      ? 'bg-orange-500'
                      : 'bg-emerald-500'
                }`}
              ></span>
              {data.role === 'admin'
                ? 'Administrator'
                : data.role === 'tecSupport'
                  ? 'Support Technician'
                  : 'Standard User'}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
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

      <CurrentImageModal
        isOpen={isCurrentImageModalOpen}
        onClose={handleCurrentImageModalClose}
        imageUrl={userProfileImg}
        userName={`${data?.firstName} ${data?.lastName}`}
      />
    </motion.div>
  );
}

export default ProfileHeader;
