const ModalAdress = ({ typeModal, setTypeModal,children }) => {
  // console.log(children);
  
  
  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center transition duration-200">
        <div
          className="absolute inset-0 bg-gray/60 transition-all duration-300 "
          onClick={() => setTypeModal({ ...typeModal, modal: false })}
        ></div>
        {children}
      </div>
    </div>
  );
};

export default ModalAdress;
