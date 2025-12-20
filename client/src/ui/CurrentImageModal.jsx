import Modal from './Modal';

const CurrentImageModal = ({ isOpen, onClose, imageUrl, userName }) => {
  if (!imageUrl) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-600 pb-3">
          <h2 className="text-lg font-semibold text-gray-200">
            {userName}'s Profile Image
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            aria-label="Close modal"
          >
            <span className="text-lg">✕</span>
          </button>
        </div>

        {/* Image Display */}
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={`${userName}'s profile`}
            className="max-h-96 max-w-full rounded-lg object-contain shadow-lg"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CurrentImageModal;
