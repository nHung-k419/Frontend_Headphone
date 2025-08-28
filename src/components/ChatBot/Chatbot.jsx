import React from "react";
import ChatWindow from "./ChatWindow";
import { useState } from "react";
import Lottie from "lottie-react";
import RobotAi from "../../assets/RobotAi.json";
import chatbot from "../../assets/chatbot.json";
import { useEffect } from "react";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
  if (isOpen) {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`; // bù lại
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };
}, [isOpen]);
  return (
    <>
      <div
        className={`fixed lg:bottom-30 md:bottom-30 bottom-9 lg:right-6 md:right-5 right-4 z-40 lg:w-[420px] md:w-[420px] w-89 lg:h-[550px] md:h-[550px] h-153 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 scale-110 visible pointer-events-auto" : "opacity-0 scale-90 invisible pointer-events-none"
        }`}
      >
        <ChatWindow onClose={() => setIsOpen(false)} />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-0 right-[-20px] z-10 cursor-pointer ${isOpen ? "lg:block sm:block hidden" : "block"} `}
      >
        <Lottie
          animationData={chatbot}
          loop={true}
          className="size-37 h-30" // 👈 điều chỉnh kích thước tại đây
        />
      </button>
    </>
  );
};

export default Chatbot;
