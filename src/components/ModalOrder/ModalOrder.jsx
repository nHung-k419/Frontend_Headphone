import { motion } from "framer-motion";

const ModalOrder = ({ typeModal, setTypeModal, children, wrapperRef }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Lớp nền mờ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60"
        onClick={() => setTypeModal({ modal: false })} // Click nền sẽ đóng modal
      />

      {/* Nội dung modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative z-10 w-full max-w-3xl flex justify-center`}
        ref={wrapperRef} // Click bên trong sẽ không đóng modal
      >
        {/* <div className="bg-white rounded-2xl shadow-lg">{children}</div> */}
        {children}
      </motion.div>
    </div>
  );
};

export default ModalOrder;
