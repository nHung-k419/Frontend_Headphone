import React, { useEffect, useState } from "react";
import { FiX, FiSend, FiMessageCircle, FiHelpCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createQuestion } from "../services/Client/Question";
import Loading from "./Loading";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
const QuestionModal = ({ isModalOpen, setIsModalOpen }) => {
  const queryClient = useQueryClient();
  const { id: idUser } = localStorage.getItem("User") ? JSON?.parse(localStorage.getItem("User")) : "";
  const {id : productId} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(id,idUser);
const [value, setValue] = useState("");
  const mutationAddQuestion = useMutation({
    mutationKey: ["addQuestion"],
    mutationFn: createQuestion,
    onSuccess: (data) => {
      setIsModalOpen(false);
      setIsLoading(false);
      toast.success(data.message);
      queryClient.invalidateQueries(["questions"]); 
    },
  })
  const submitQuestion = () => {
   if(value.length > 0){
     setIsLoading(true);
    const data = {
      userId: idUser,
      productId: productId,
      title: value,
    };
    mutationAddQuestion.mutate(data);
   }else{
    toast.warning("Vui lòng nhập nội dung câu hỏi!!")
   }
    // setIsModalOpen(false);
  };
  return (
    <div className="">
      {/* Trigger Button */}
      {/* <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl transition-all duration-300 flex items-center space-x-3 transform hover:scale-105"
      >
        <FiHelpCircle className="w-6 h-6" />
        <span>Đặt câu hỏi</span>
      </button> */}

      {/* Modal Overlay */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto "
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200 "
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-5 mt-10 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Đặt câu hỏi</h2>
                  <p className="text-gray-600 text-sm">Chúng tôi sẽ trả lời trong vòng 24 giờ</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Question Input */}
              <div className="space-y-2">
                <label className="block text-gray-800 font-semibold text-lg">
                  Câu hỏi của bạn <span className="text-red-500">*</span>
                </label>
                <textarea
                onChange={(e) => setValue(e.target.value)}
                  placeholder="Ví dụ: Tai nghe Sony WH-1000XM4 có tương thích với iPhone không? Chất lượng âm thanh như thế nào?"
                  className="w-full h-32 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                />
                <div className="text-right text-sm text-gray-500">0/500 ký tự</div>
              </div>
              {/* Personal Info */}
              {idUser ? (
                <></>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold">
                      Tên của bạn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập họ tên"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <h4 className="text-blue-700 font-semibold mb-2 flex items-center space-x-2">
                  <span>💡</span>
                  <span>Mẹo để được trả lời nhanh chóng:</span>
                </h4>
                <ul className="text-gray-700 text-sm space-y-1 ml-6">
                  <li>• Mô tả rõ ràng và chi tiết vấn đề bạn gặp phải</li>
                  <li>• Cung cấp tên sản phẩm cụ thể nếu có</li>
                  <li>• Tránh đặt quá nhiều câu hỏi trong một lần</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button onClick={() => submitQuestion()} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg transform hover:scale-[1.02]">
                <FiSend className="w-5 h-5" />
                <span>{isLoading ? <Loading/> : "Gửi câu hỏi"}</span>
              </button>

              {/* Contact Info */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Cần hỗ trợ khẩn cấp?</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <a href="tel:19001234" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    📞 Gọi 1900-1234
                  </a>
                  <span className="text-gray-400">|</span>
                  <span className="text-green-600">⏱️ Phản hồi: 2-4 giờ</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionModal;
