// components/ChatWindow.jsx
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { sendChatBot } from "../../services/Client/sendChatBot";
import ChatBubble from "./Chatbuble";
import Cookies from "js-cookie";
import { useRef, useEffect } from "react";
import { IoArrowDown } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
const ChatWindow = ({ onClose }) => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const user = localStorage?.getItem("User");
  const { id: idUser, Name } = user ? JSON?.parse(user) : "";
  const [isLoading, setIsLoading] = useState(false);
  const [isExistArrowDown, setIsExistArrowDown] = useState(false);
  const [scrollDown, setScrollDown] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: `Xin chào ${Name ? Name : ""} ! Tôi là trợ lý ảo của Soundora Tôi có thể giúp gì cho bạn hôm nay? 🎧` },
  ]);
  const [input, setInput] = useState("");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, scrollDown]);
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsExistArrowDown(!isBottom);
    };
    scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { mutate } = useMutation({
    mutationKey: ["sendchatbotait"],
    mutationFn: (data) => sendChatBot(data),
    onSuccess: (data) => {
      setIsLoading(false);
      console.log(data.answer);
      setMessages([...messages, { from: "bot", text: data.answer }]);
    },
  });
  // console.log(data?.answer);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    mutate({ question: input });
    setInput("");
    setIsLoading(true);
  };
  // console.log(isLoading);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-teal-500 text-white text-lg font-semibold p-3 flex items-center justify-between">
        <h1>🤖 Trợ lý AI Soundora</h1>
        <span onClick={onClose} className="cursor-pointer">
          <AiFillCloseCircle />
        </span>
      </div>

      <div ref={scrollContainerRef} className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100">
        {isExistArrowDown && (
          <div className="flex justify-center items-center ">
            <button
              onClick={() => setScrollDown(!scrollDown)}
              className="fixed flex justify-center items-center bottom-25 w-9 h-9  rounded-full bg-gray-300  z-50 cursor-pointer"
            >
              <IoArrowDown />
            </button>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div>
            <ChatBubble key={idx} from={msg.from} text={msg.text} />
          </div>
        ))}
        <div ref={messagesEndRef}></div>

        {isLoading && (
          <div className="bg-gray-200 rounded-lg px-3 inline-block max-w-[60%]">
            <div className="flex items-center space-x-1 w-10 justify-center ">
              <span className="animate-bounce text-4xl text-blue-600" style={{ animationDelay: "0ms" }}>
                .
              </span>
              <span className="animate-bounce text-4xl text-blue-600" style={{ animationDelay: "100ms" }}>
                .
              </span>
              <span className="animate-bounce text-4xl text-blue-600" style={{ animationDelay: "200ms" }}>
                .
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 flex gap-2">
        <input
          type="text"
          value={input}
          placeholder="Nhập câu hỏi..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border-1 border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:border-gray-500 transform transition duration-200 ease-in-out"
        />
        <button onClick={handleSend} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 cursor-pointer lg:hidden md:block sm:block">
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
