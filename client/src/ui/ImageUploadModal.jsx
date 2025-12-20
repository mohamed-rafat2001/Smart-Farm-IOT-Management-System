import Modal from './Modal';
import Button from './Button';

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-8"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between border-b border-stone-700/50 pb-6">
          <h2 className="truncate text-2xl font-bold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-400 transition-all duration-300 hover:bg-stone-800 hover:text-white"
            disabled={isUploading}
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* File input section */}
        <div className="space-y-4">
          <label
            htmlFor="photo"
            className="block text-base font-semibold text-stone-300 ml-1"
          >
            Select Image File
          </label>
          <div className="relative group">
            <input
              name="photo"
              id="photo"
              type="file"
              accept={accept}
              disabled={isUploading}
              {...register('photo', {
                required: 'Please select an image file',
              })}
              className="w-full rounded-2xl border border-stone-700/50 bg-[#1b2127]/80 px-4 py-3 text-sm text-stone-400 transition-all duration-300 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none disabled:opacity-50"
            />
          </div>
          {errors.photo && (
            <p className="mt-2 text-sm font-medium text-red-400 flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.photo.message}
            </p>
          )}
        </div>

        {/* File info display */}
        {selectedFile && fileInfo && (
          <div className="rounded-2xl border border-stone-700/50 bg-stone-800/30 p-5 backdrop-blur-sm">
            <p className="mb-4 text-sm font-bold tracking-wider text-stone-500 uppercase">Selected File Details</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-stone-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-stone-500">Name</p>
                  <p className="truncate text-sm font-semibold">{fileInfo.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-500">Size</p>
                  <p className="text-sm font-semibold">{fileInfo.size} MB</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="pt-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              type="submit"
              variant="primary"
              className="flex-1 !rounded-2xl !py-4 !font-bold shadow-xl shadow-blue-500/20"
              disabled={isUploading || !isFileValid}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Uploading... {uploadProgress}%</span>
                </span>
              ) : (
                'Upload Image'
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 !rounded-2xl !py-4 !font-bold !border-stone-700 !text-stone-300 hover:!bg-stone-800/50 hover:!border-stone-600"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ImageUploadModal;
