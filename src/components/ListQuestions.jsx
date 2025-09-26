import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoHelpCircle,
  IoPersonCircle,
  IoTimeOutline,
  IoChevronDown,
  IoChevronUp,
  IoSendSharp,
  IoThumbsUpOutline,
  IoThumbsDownOutline,
  IoCheckmarkCircle,
  IoChatbubbleOutline,
} from "react-icons/io5";
import QuestionModal from "./QuestionModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMessage, GetAllConversation, getConversation } from "../services/Client/Question";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
// Memoized ReplyItem component để tránh re-render không cần thiết
const ReplyItem = ({
  reply,
  parentAuthor,
  isNested,
  nestedReplyBox,
  nestedReplyText,
  onToggleNestedReplyBox,
  onNestedReplyTextChange,
  onNestedReplySubmit,
}) => {
  // console.log('reply',reply);

  return (
    <motion.div
      className={`${isNested ? "border-l-2 border-teal-200 pl-4 bg-teal-50/30" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {reply.senderId?.Image?.path ? (
            <img src={reply.senderId.Image.path} alt={reply.senderId.Name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <IoPersonCircle className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {/* Nội dung */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-800">{reply.senderId?.Name}</span>
            {reply.senderId.Name === "Quản Trị Viên" && (
              <span className="text-white bg-red-600 h-4.5 w-10 rounded-md text-center text-xs font-bold">QTV</span>
            )}
            {reply.parentId && (
              <>
                <span className="text-gray-400">trả lời</span>
                <span className="text-sm font-medium text-teal-600">@{reply.replyToName}</span>
                {reply.replyToName === "Quản Trị Viên" && (
                  <span className="text-white bg-red-600 h-4.5 w-10 rounded-md text-center text-xs font-bold">QTV</span>
                )}
              </>
            )}
            <span className="text-gray-400">•</span>
            <span className="text-xs text-gray-500">{dayjs(reply?.createdAt).fromNow().replace("trước", "").trim()}</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3">{reply.content}</p>

          {/* Action */}
          <div className="flex items-center gap-4">
            <motion.button
              className="flex items-center gap-1 text-gray-400 hover:text-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <IoThumbsUpOutline className="w-3 h-3" />
              <span className="text-xs">{reply.likes || 0}</span>
            </motion.button>

            <motion.button
              onClick={() => onToggleNestedReplyBox(reply._id)}
              className="flex items-center gap-1 text-gray-400 hover:text-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <IoChatbubbleOutline className="w-3 h-3" />
              <span className="text-xs">Trả lời</span>
            </motion.button>
          </div>

          {/* Ô nhập reply con */}
          <AnimatePresence>
            {nestedReplyBox.includes(reply._id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 overflow-hidden"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-2">
                    <IoPersonCircle className="w-6 h-6 text-gray-400" />
                    <div className="flex-1">
                      <textarea
                        placeholder={`Trả lời @${reply.senderId?.Name}...`}
                        className="w-full p-2 border border-gray-200 rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-teal-500"
                        rows={2}
                        value={nestedReplyText[reply._id]}
                        onChange={(e) => onNestedReplyTextChange(reply._id, reply.questionId, e.target.value)}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => onToggleNestedReplyBox(reply._id)}
                          className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Hủy
                        </button>
                        <motion.button
                          onClick={() => onNestedReplySubmit(reply._id, reply.questionId)}
                          className="px-3 py-1 bg-teal-600 text-white rounded text-xs hover:bg-teal-700 transition-colors flex items-center gap-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          // disabled={!nestedReplyText[reply._id]?.trim()}
                        >
                          <IoSendSharp className="w-3 h-3" />
                          Gửi
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render các replies con (đệ quy) */}
          {/* {reply.replies && reply.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {reply.replies.map((nested) => (
                <ReplyItem
                  key={nested._id}
                  reply={nested}
                  parentAuthor={reply.senderId?.Name}
                  isNested={true}
                  nestedReplyBox={nestedReplyBox}
                  nestedReplyText={nestedReplyText}
                  onToggleNestedReplyBox={onToggleNestedReplyBox}
                  onNestedReplyTextChange={onNestedReplyTextChange}
                  onNestedReplySubmit={onNestedReplySubmit}
                />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  );
};

// Memoized QuestionItem component
const QuestionItem = React.memo(
  ({
    qa,
    index,
    flatReplies,
    dataReply,
    expandedQuestions,
    showReplyBox,
    replyText,
    nestedReplyBox,
    nestedReplyText,
    onToggleQuestion,
    onToggleReplyBox,
    onReplyTextChange,
    onReplySubmit,
    onToggleNestedReplyBox,
    onNestedReplyTextChange,
    onNestedReplySubmit,
  }) => {
    // console.log('dataReply',qa);
    // console.log('dataReply',dataReply);
    // const abc = dataReply?.data?.map((reply) => reply);
    // console.log(abc);
    // console.log(flatReplies);

    return (
      <motion.div
        className="border border-gray-100 rounded-lg hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -2 }}
      >
        {/* Question */}
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {qa.userId ? (
                <img src={qa.userId.Image.path} alt={qa.author} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <IoPersonCircle className="w-10 h-10 text-gray-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-800">{qa.userId.Name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <IoTimeOutline className="w-4 h-4" />
                  {dayjs(qa?.createdAt).fromNow().replace("trước", "").trim()}
                </span>
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">{qa.title}</p>

              <div className="flex items-center gap-4">
                <motion.button
                  className="flex items-center gap-1 text-gray-500 hover:text-teal-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IoThumbsUpOutline className="w-4 h-4" />
                  <span className="text-sm">{1}</span>
                </motion.button>

                {/* {qa.replies?.length > 0 && ( */}
                <motion.button
                  onClick={() => onToggleQuestion(qa._id)}
                  className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {expandedQuestions.includes(qa._id) ? <IoChevronUp className="w-4 h-4" /> : <IoChevronDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{expandedQuestions.includes(qa._id) ? "Ẩn" : "Xem thêm"}</span>
                </motion.button>
                {/* )} */}

                <motion.button
                  onClick={() => onToggleReplyBox(qa._id)}
                  className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Trả lời
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies */}
        <AnimatePresence>
          {expandedQuestions.includes(qa._id) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-100 bg-gray-50 p-5 space-y-4">
                {flatReplies?.map((reply) => (
                  <ReplyItem
                    key={reply._id}
                    reply={reply}
                    parentAuthor={reply.parentAuthor}
                    isNested={reply.isNested}
                    nestedReplyBox={nestedReplyBox}
                    nestedReplyText={nestedReplyText}
                    onToggleNestedReplyBox={onToggleNestedReplyBox}
                    onNestedReplyTextChange={onNestedReplyTextChange}
                    onNestedReplySubmit={onNestedReplySubmit}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Reply Box */}
        <AnimatePresence>
          {showReplyBox.includes(qa._id) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 p-4 bg-teal-50 overflow-hidden"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <IoPersonCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder={`@ Trả lời ${qa?.userId?.Name}...`}
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    rows={3}
                    value={replyText[qa._id]}
                    onChange={(e) => onReplyTextChange(qa._id, e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Hãy trả lời một cách tử tế và hữu ích</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onToggleReplyBox(qa._id)}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Hủy
                      </button>
                      <motion.button
                        onClick={() => onReplySubmit(qa._id)}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors flex items-center gap-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        // disabled={!replyText[qa._id]?.trim()}
                      >
                        <IoSendSharp className="w-4 h-4" />
                        Gửi
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

const ListQuestions = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [showReplyBox, setShowReplyBox] = useState([]);
  const [nestedReplyBox, setNestedReplyBox] = useState([]);
  const [nestedReplyText, setNestedReplyText] = useState({});
  const [dataReply, setDataReply] = useState([]);
  const [flatReplies, setFlatReplies] = useState([]);
  const [questionId, setQuestionId] = useState("");
  const { id } = useParams();
  // console.log(nestedReplyText);

  const { data: dataQuestions } = useQuery({
    queryKey: ["questions"],
    queryFn: () => GetAllConversation(id),
  });

  // Mock user data
  const user = localStorage.getItem("User");
  const { id: idUser, Role } = user ? JSON?.parse(user) : "";

  // Enhanced Q&A data với nested replies
  // const mutationSeeQuestions = useMutation({
  //   mutationKey: ["seeQuestions"],
  //   mutationFn: getConversation,
  //   onSuccess: (data) => {
  //     // console.log(data);

  //     setDataReply(data);
  //   },
  // });

  //   console.log(expandedQuestions);

  // Memoized callbacks để tránh re-render
  const toggleQuestion = useCallback((questionId) => {
    setExpandedQuestions((prev) => (prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [questionId]));
    setQuestionId(questionId);
    // if (expandedQuestions.includes(questionId)) {
    // }
    // mutationSeeQuestions.mutate(questionId);
  }, []);

  const { data } = useQuery({
    queryKey: ["getConversation", questionId],
    queryFn: () => getConversation(questionId),
    enabled: !!questionId,
    refetchOnMount: true,       // khi component re-mount
  refetchOnWindowFocus: true, // khi quay lại tab
  });
  useEffect(() => {
    if(data){
      setDataReply(data);
    }
  },[data])
  // console.log(expandedQuestions);
  
  // console.log(expandedQuestions);

  const toggleReplyBox = useCallback(
    (questionId) => {
      setShowReplyBox((prev) => (prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [questionId]));
    },
    [showReplyBox]
  );

  const toggleNestedReplyBox = useCallback(
    (replyId) => {
      setNestedReplyBox((prev) => (prev.includes(replyId) ? prev.filter((id) => id !== replyId) : [replyId]));
    },
    [nestedReplyBox]
  );

  const handleReplyTextChange = useCallback((questionId, value) => {
    setReplyText((prev) => ({
      ...prev,
      senderId: idUser,
      role: Role,
      parentId: questionId,
      questionId,
      content: value,
    }));
  }, []);
  // console.log(replyText);

  // handle nested reply children
  const handleNestedReplyTextChange = useCallback((replyId, questionId, value) => {
    // console.log(value, replyId,questionId);

    setNestedReplyText((prev) => ({
      ...prev,
      questionId: questionId,
      senderId: idUser,
      role: Role,
      parentId: replyId,
      content: value,
    }));
  }, []);

  const mutationAddmessage = useMutation({
    mutationKey: ["addmessage"],
    mutationFn: addMessage,
    onSuccess: (data) => {
      // mutationSeeQuestions.mutate(data.questionId)
    },
  });

  const handleReplySubmit = useCallback(
    (questionId) => {
      mutationAddmessage.mutate(replyText);
      setShowReplyBox([]);
    },
    [replyText]
  );

  const handleNestedReplySubmit = useCallback(
  async (replyId, questionId) => {
    await mutationAddmessage.mutateAsync(nestedReplyText);
    setNestedReplyBox([]);

    await queryClient.invalidateQueries(["getConversation", questionId]);
    await queryClient.refetchQueries(["getConversation", questionId]);
  },
  [nestedReplyText]
);


  // Memoized function để flatten replies
  const flattenReplies = useCallback((replies, parentAuthor = null) => {
    let flatList = [];

    replies.forEach((reply) => {
      flatList.push({
        ...reply,
        parentAuthor: parentAuthor,
        isNested: parentAuthor !== null,
      });

      if (reply.replies && reply.replies.length > 0) {
        const nestedFlat = flattenReplies(reply.replies, reply.author);
        flatList = flatList.concat(nestedFlat);
      }
    });

    return flatList;
  }, []);
  useEffect(() => {
    if (dataReply?.data) {
      const flat = flattenReplies(dataReply.data);
      setFlatReplies(flat);
    }
  }, [dataReply, flattenReplies]);
  // Memoized total replies calculation
  // const totalReplies = useMemo(() => {
  //   return dataReply.reduce((acc, q) => {
  //     const countReplies = (replies) => {
  //       return replies.reduce((count, reply) => {
  //         return count + 1 + (reply.replies ? countReplies(reply.replies) : 0);
  //       }, 0);
  //     };
  //     return acc + countReplies(q.replies);
  //   }, 0);
  // }, [dataReply]);

  // Memoized processed questions với flattened replies
  const processedQuestions = useMemo(() => {
    return (
      dataQuestions ||
      []?.map((qa) => ({
        ...qa,
      }))
    );
  }, [dataQuestions]);
  // console.log(processedQuestions);
  // console.log(dataQuestions);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `15px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "";
    }
  }, [isModalOpen]);

  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
      {/* Header */}
      <QuestionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <IoHelpCircle className="w-6 h-6 text-teal-600" />
          </motion.div>
          <div>
            <h2 className="font-bold text-xl text-gray-800">Hỏi và đáp</h2>
            <p className="text-gray-500 text-sm">Đặt câu hỏi về sản phẩm</p>
          </div>
        </div>

       <motion.button
            onClick={() => setIsModalOpen(true)}
            className={`px-6 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors flex items-center gap-2 ${!idUser ? "cursor-not-allowed" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!idUser}
          >
            <IoHelpCircle className="w-4 h-4" />
            Đặt câu hỏi
          </motion.button>
      </div>

      {/* Question Summary */}
      <div className="flex items-center gap-8 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-teal-600">{processedQuestions?.data?.length}</span>
          <p className="text-gray-500 text-sm">câu hỏi</p>
        </div>

        {/* <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-orange-600">{dataReply}</span>
          <p className="text-gray-500 text-sm">tổng phản hồi</p>
        </div> */}

        <div className="h-12 w-px bg-gray-200"></div>

        <div className="flex-1">
          <p className="font-medium text-gray-700 mb-1">Cộng đồng hỏi đáp sản phẩm</p>
          <p className="text-gray-500 text-sm">Chia sẻ kinh nghiệm và trao đổi với cộng đồng</p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {processedQuestions?.data?.length > 0 ? (
            processedQuestions?.data.map((qa, index) => (
              <QuestionItem
                key={qa.id}
                qa={qa}
                index={index}
                dataReply={dataReply}
                flatReplies={flatReplies}
                expandedQuestions={expandedQuestions}
                showReplyBox={showReplyBox}
                replyText={replyText}
                nestedReplyBox={nestedReplyBox}
                nestedReplyText={nestedReplyText}
                onToggleQuestion={toggleQuestion}
                onToggleReplyBox={toggleReplyBox}
                onReplyTextChange={handleReplyTextChange}
                onReplySubmit={handleReplySubmit}
                onToggleNestedReplyBox={toggleNestedReplyBox}
                onNestedReplyTextChange={handleNestedReplyTextChange}
                onNestedReplySubmit={handleNestedReplySubmit}
              />
            ))
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <IoHelpCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Chưa có câu hỏi nào</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-sm">
                Hãy là người đầu tiên đặt câu hỏi về sản phẩm này và nhận được tư vấn từ cộng đồng!
              </p>
              {idUser && (
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Đặt câu hỏi đầu tiên
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ListQuestions;
