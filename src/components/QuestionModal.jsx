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
  const { id: productId } = useParams();
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
    if (value.length > 0) {
      setIsLoading(true);
      const data = {
        userId: idUser,
        productId: productId,
        title: value,
      };
      mutationAddQuestion.mutate(data);
    } else {
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
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        >
          {/* Modal Content - Compact max-w-lg */}
          <motion.div
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full max-w-lg overflow-hidden border border-slate-100"
          >
            {/* Header - Minimalist */}
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-2xl flex items-center justify-center">
                  <FiMessageCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 tracking-tight">Đặt câu hỏi</h2>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Phản hồi trong 24h</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-gray-900 rounded-xl transition-all"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-8 py-6 space-y-6">
              {/* Question Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-widest">
                    Nội dung thắc mắc <span className="text-teal-500">*</span>
                  </label>
                  <span className="text-[10px] font-bold text-slate-300">{value.length}/500</span>
                </div>
                <div className="relative group">
                  <textarea
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    maxLength={500}
                    placeholder="Nhập nội dung bạn đang quan tâm..."
                    className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white resize-none transition-all duration-300"
                  />
                  <div className="absolute bottom-3 right-3 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <FiSend className="w-4 h-4 text-teal-200" />
                  </div>
                </div>
              </div>

              {/* Guest Info - Compact Grid */}
              {!idUser && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tên của bạn</label>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
                    <input
                      type="email"
                      placeholder="email@vidu.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Tips Section - Subtle Card */}
              <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs">💡</span>
                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Mẹo hỏi nhanh</h4>
                </div>
                <ul className="grid grid-cols-1 gap-2">
                  {[
                    "Mô tả rõ vấn đề bạn gặp phải",
                    "Cung cấp tên sản phẩm cụ thể",
                    "Tập trung vào 1 câu hỏi chính"
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
                      <span className="w-1 h-1 bg-teal-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col gap-4 pt-2">
                <button
                  onClick={submitQuestion}
                  disabled={isLoading}
                  className="w-full h-12 bg-gray-900 hover:bg-teal-600 text-white font-bold uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl shadow-gray-900/10 hover:shadow-teal-500/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <span>Gửi câu hỏi ngay</span>
                      <FiSend className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6">
                  <a href="tel:19001234" className="text-[10px] font-bold text-slate-400 hover:text-teal-600 transition-colors flex items-center gap-1.5">
                    <span className="text-sm">📞</span> 1900-1234
                  </a>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <div className="text-[10px] font-bold text-teal-600/70 py-1 px-3 bg-teal-50 rounded-full">
                    Phản hồi trong 2-4 giờ làm việc
                  </div>
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
