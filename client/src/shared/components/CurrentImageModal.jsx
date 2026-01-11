import Modal from './Modal';
import { motion } from 'framer-motion';

const CurrentImageModal = ({ isOpen, onClose, imageUrl, userName }) => {
  if (!imageUrl) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-full max-h-[80vh] flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-stone-800/50 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight text-white">
              Profile Image<span className="text-blue-500">.</span>
            </h2>
            <p className="text-[10px] font-medium tracking-wider text-stone-500 uppercase">
              Viewing {userName}'s profile picture
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-stone-800 bg-stone-900/50 text-stone-400 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500 active:scale-90"
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

        {/* Image Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-stone-800/50 bg-stone-950/20"
        >
          <img
            src={imageUrl}
            alt={`${userName}'s profile`}
            className="max-h-[50vh] w-full object-contain shadow-2xl transition-transform duration-700 group-hover:scale-105"
            loading="eager"
            decoding="async"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-stone-700/50 bg-stone-800 px-8 py-4 text-xs font-black tracking-widest text-stone-100 uppercase shadow-lg transition-all hover:bg-stone-700 active:scale-95 sm:w-auto"
          >
            Close Preview
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CurrentImageModal;
