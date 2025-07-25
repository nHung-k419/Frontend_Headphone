import { motion } from "framer-motion";

const Modal = ({ typeModal, setTypeModal, children }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center transition duration-200">
      {/* Backdrop click để đóng */}
      <div
        className="absolute inset-0"
        onClick={() => setTypeModal({ ...typeModal, modal: false })}
      ></div>

      {/* Nội dung Modal, ngăn click lan ra ngoài */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-50 "
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
