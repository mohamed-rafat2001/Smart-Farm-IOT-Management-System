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
        className="w-full max-w-sm space-y-3 sm:max-w-md sm:space-y-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between border-b border-gray-600 pb-2 sm:pb-3">
          <h2 className="truncate pr-2 text-base font-semibold text-gray-200 sm:text-lg lg:text-xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-full p-1 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-white sm:p-2"
            disabled={isUploading}
            aria-label="Close modal"
          >
            <span className="text-sm sm:text-base">✕</span>
          </button>
        </div>

        {/* File input section */}
        <div className="space-y-2">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-300 sm:text-base"
          >
            Select Image File
          </label>
          <input
            name="photo"
            id="photo"
            type="file"
            accept={accept}
            disabled={isUploading}
            {...register('photo', {
              required: 'Please select an image file',
            })}
            className="w-full rounded-lg border border-gray-600 bg-[#1b2127] p-2 text-sm text-stone-400 transition-all duration-200 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 sm:p-3 sm:text-base"
          />
          {errors.photo && (
            <p className="mt-1 text-xs text-red-500 sm:text-sm">
              {errors.photo.message}
            </p>
          )}
        </div>

        {/* File info display */}
        {selectedFile && fileInfo && (
          <div className="rounded-lg bg-gray-800 p-2 text-xs text-gray-300 sm:p-3 sm:text-sm">
            <p className="mb-2 font-medium text-gray-200">Selected File:</p>
            <div className="space-y-1">
              <p className="flex items-center space-x-2">
                <span>📁</span>
                <span className="truncate">Name: {fileInfo.name}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>📏</span>
                <span>Size: {fileInfo.size} MB</span>
              </p>
              <p className="flex items-center space-x-2">
                <span>🔤</span>
                <span className="truncate">Type: {fileInfo.type}</span>
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3 sm:space-y-4">
          {/* Button layout changes based on screen size */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button
              type="submit"
              color="#c9fa75"
              className="w-full rounded-full bg-[#283039] py-2 text-sm font-bold transition-all duration-200 disabled:opacity-50 sm:flex-1 sm:py-3 sm:text-base"
              disabled={isUploading || !isFileValid}
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">⏳</span>
                  <span className="hidden sm:inline">
                    Uploading... {uploadProgress}%
                  </span>
                  <span className="sm:hidden">Uploading {uploadProgress}%</span>
                </span>
              ) : (
                'Upload Image'
              )}
            </Button>

            <Button
              type="button"
              color="#ef4444"
              className="w-full rounded-full bg-red-600 py-2 text-sm font-bold transition-colors duration-200 hover:bg-red-700 disabled:opacity-50 sm:flex-1 sm:py-3 sm:text-base"
              onClick={onClose}
              disabled={isUploading}
            >
              {isUploading ? 'Upload in Progress...' : 'Cancel'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ImageUploadModal;
