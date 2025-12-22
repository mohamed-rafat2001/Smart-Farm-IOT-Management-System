import { createPortal } from 'react-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '1rem',
          }}
          onClick={onClose}
        >
          <Motion.div
            className="modal"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 400,
            }}
            style={{
              background: '#283039',
              padding: '1.5rem',
              borderRadius: '2rem',
              width: '100%',
              maxWidth: '36rem',
              maxHeight: '90vh',
              border: '1px solid rgba(120, 113, 108, 0.3)',
              boxShadow:
                '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
