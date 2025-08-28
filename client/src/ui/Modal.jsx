import { motion as Motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={onClose}
        >
          <Motion.div
            className="modal"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            style={{
              background: '#1b2127',
              padding: '1rem',
              borderRadius: '12px',
              width: '50%',
              maxWidth: '95vw',
              maxHeight: '90vh',
              border: '1px solid #374151',
              boxShadow:
                '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
