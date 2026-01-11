import Modal from './Modal';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const ImageUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  register,
  handleSubmit,
  errors,
  selectedFile,

  isUploading,
  isFileValid,
  getFileInfo,
  uploadProgress = 0, // Add uploadProgress prop

  title = 'Upload Image',
  accept = 'image/*',
}) => {
  const fileInfo = getFileInfo();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-8"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between border-b border-stone-800/50 pb-6">
          <div className="space-y-1">
            <h2 className="truncate text-2xl font-black tracking-tight text-white">
              {title}
              <span className="text-blue-500">.</span>
            </h2>
            <p className="text-[10px] font-black tracking-widest text-stone-500 uppercase">
              Select a high-quality image file
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-stone-800 bg-stone-900/50 text-stone-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 active:scale-90"
            disabled={isUploading}
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* File input section */}
        <div className="space-y-4">
          <label
            htmlFor="photo"
            className="ml-1 text-[10px] font-black tracking-[0.2em] text-stone-500 uppercase"
          >
            Select Image File
          </label>
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500 transition-colors group-focus-within:text-blue-500">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              name="photo"
              id="photo"
              type="file"
              accept={accept}
              disabled={isUploading}
              {...register('photo', {
                required: 'Please select an image file',
              })}
              className="w-full rounded-2xl border border-stone-800/50 bg-[#1b2127]/50 py-4 pr-4 pl-12 text-sm font-medium text-stone-300 transition-all duration-300 file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-blue-600/10 file:px-4 file:py-2 file:text-[10px] file:font-black file:tracking-widest file:text-blue-400 file:uppercase hover:file:bg-blue-600 hover:file:text-white focus:border-blue-500/50 focus:bg-[#1b2127] focus:ring-4 focus:ring-blue-500/10 focus:outline-none disabled:opacity-50"
            />
          </div>
          <AnimatePresence mode="wait">
            {errors.photo && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-2 text-[10px] font-black tracking-widest text-red-500 uppercase"
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.photo.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* File info display */}
        <AnimatePresence mode="wait">
          {selectedFile && fileInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-2xl border border-stone-800/50 bg-stone-900/30 p-5 backdrop-blur-sm"
            >
              <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-stone-600 uppercase">
                Selected File Details
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-4 text-stone-300">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black tracking-wider text-stone-500 uppercase">
                      Name
                    </p>
                    <p className="truncate text-sm font-bold tracking-tight">
                      {fileInfo.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-stone-300">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-wider text-stone-500 uppercase">
                      Size
                    </p>
                    <p className="text-sm font-bold tracking-tight">
                      {fileInfo.size} MB
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="pt-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="!rounded-2xl !py-4"
              disabled={isUploading || !isFileValid}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Uploading... {uploadProgress}%</span>
                </span>
              ) : (
                'Start Upload'
              )}
            </Button>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              className="!rounded-2xl !py-4"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </motion.form>
    </Modal>
  );
};

export default ImageUploadModal;
