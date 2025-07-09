import React from 'react';
import CommentSidebar from './CommentSidebar';
import CartSidebar from './CartSidebar';
const SidebarReview = ({keyOpen, isOpen, onClose }) => {
  // console.log(keyOpen);
  
  return (
    // Wrapper with overlay
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible ' : 'invisible'}`}>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 `}
      >
      </div>
      {/* Sidebar */}
      <div className={`absolute right-0 top-0 h-full rounded-lg ${keyOpen === 'cart' ? ' lg:w-[1000px] w-full lg:bg-white bg-gray-100':'lg:w-[700px] w-full p-6 overflow-y-auto bg-white'}  shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {keyOpen === 'detail' ? <CommentSidebar isOpen = {isOpen} onClose ={onClose} /> : <CartSidebar isOpen = {isOpen} onClose ={onClose}/>}
      </div>
    </div>
  );
};

export default SidebarReview;
