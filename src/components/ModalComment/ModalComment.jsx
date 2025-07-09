// components/ModalComment/ModalComment.jsx
import ReactDOM from "react-dom";

const ModalComment = ({ children, setTypeModal }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative ">
        <button
          onClick={() => setTypeModal({ type: "", modal: false })}
          className="absolute top-2 right-2 text-gray-500 text-2xl hover:text-gray-700 cursor-pointer"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalComment;
