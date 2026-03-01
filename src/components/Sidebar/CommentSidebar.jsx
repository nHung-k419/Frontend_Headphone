import { useEffect, useState } from "react";
import socket from "../../Socket";
import ModalComment from "../ModalComment/ModalComment";
import { FaStar, FaRegStar, FaCamera, FaTimes, FaThumbsUp, FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../../services/Client/Detail";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendImageComment, getReviewsById } from "../../services/Client/Reviews";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { GetLikeComment } from "../../services/Client/LikeComment";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { PiCursorClickFill } from "react-icons/pi";
import ReactStars from "react-rating-stars-component";
import ReviewItemSkeleton from "../Skeleton/ReviewsSkeleton";
import { motion, AnimatePresence } from "framer-motion";

const CommentSidebar = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [value, setValue] = useState({ content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState([]);
  const [images, setImages] = useState([]);
  const [cacheReview, setCacheReview] = useState({});

  dayjs.extend(relativeTime);
  dayjs.locale("vi");

  const handleGetvalue = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetImage = (e) => {
    const files = Array.from(e.target.files);
    setFileUrl(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const mutationImage = useMutation({
    mutationKey: ["sendImageComment"],
    mutationFn: (formData) => sendImageComment(formData),
    onSuccess: (data) => {
      setIsLoading(false);
      const dataContent = {
        Content: value.content,
        Rating: rating,
        Images: data?.result,
        Id_Product: id,
        Id_User: idUser,
      };
      socket.emit("sendReview", dataContent, (response) => {
        console.log("📥 Server phản hồi lại:", response);
      });
      queryClient.invalidateQueries(["getReviewsById", id]);
      setTypeModal({ type: "", modal: false });
    },
  });

  const { data: dataReviews, isLoading: isLoadingReview } = useQuery({
    queryKey: ["getReviewsById", id],
    queryFn: () => getReviewsById(id),
  });

  const handleDeleteImage = (image, index) => {
    setImages((prev) => prev.filter((item) => item !== image));
    setFileUrl((prev) => prev.filter((item) => item !== fileUrl[index]));
  };

  const handleSubmit = () => {
    if (images.length > 0) {
      setIsLoading(true);
      const formData = new FormData();
      fileUrl.forEach((img) => {
        formData.append("Images", img);
      });
      mutationImage.mutate(formData);
    } else if (value.content !== "") {
      const dataContent = {
        Content: value.content,
        Rating: rating,
        Images: [],
        Id_Product: id,
        Id_User: idUser,
      };
      socket.emit("sendReview", dataContent);
      // queryClient.invalidateQueries(["getReviewsById", id]);
      setIsLoading(false);
      setTypeModal({ type: "", modal: false });
      setValue({ content: "" });
      setImages([]);
      setFileUrl([]);
    }
  };
  useEffect(() => {
    const handleNewReview = (newReview) => {
      queryClient.setQueryData(["getReviewsById", id], (oldData) => {
        if (!oldData) return oldData;

        // tránh bị duplicate
        const existed = oldData.result.some(
          (item) => item._id === newReview._id
        );
        if (existed) return oldData;

        return {
          ...oldData,
          result: [newReview, ...oldData.result],
        };
      });
    };

    socket.on("newReview", handleNewReview);

    return () => socket.off("newReview", handleNewReview);
  }, [id, queryClient]);

  const { data: dataLikeComment } = useQuery({
    queryKey: ["getLikeComment", idUser],
    queryFn: () => GetLikeComment(idUser),
  });

  const [localLikedCommentIds, setLocalLikedCommentIds] = useState();
  const handleLike = (id_Review) => {
    socket.emit("likeReview", { userId: idUser, commentId: id_Review });
  };

  useEffect(() => {
    const handleNewLike = ({ commentId, likes }) => {
      queryClient.setQueryData(["getReviewsById", id], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          result: oldData.result.map((item) =>
            item._id === commentId ? { ...item, Likes: likes } : item
          ),
        };
      });
    };

    socket.on("newLike", handleNewLike);

    return () => socket.off("newLike", handleNewLike);
  }, [id, queryClient]);

  useEffect(() => {
    const handleNewLike = () => {
      queryClient.invalidateQueries(["getLikeComment", idUser]);
    };
    socket.on("newLike", handleNewLike);
    return () => {
      socket.off("newLike", handleNewLike);
    };
  }, [idUser, queryClient]);

  const [openReply, setOpenReply] = useState({ id_Review: "", isOpen: false });
  const handleReply = (id_Review) => {
    setOpenReply((prev) => ({
      id_Review,
      isOpen: prev.id_Review === id_Review ? !prev.isOpen : true,
    }));
  };

  const handleOpenModal = () => {
    setTypeModal({ type: "comment", modal: true });
  };

  const { data } = useQuery({
    queryKey: ["getDetailProduct", id],
    queryFn: () => getDetailProduct(id),
  });

  return (
    <div className="flex flex-col h-full bg-[#FCFBFA] font-sans overflow-hidden border-l border-[#E8E8E8]">
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto px-10 py-12 custom-scrollbar relative z-10">
        {/* Modal Logic (Minimalist Style) */}
        <AnimatePresence>
          {typeModal.modal && (
            <ModalComment typeModal={typeModal} setTypeModal={setTypeModal}>
              <div className="space-y-10 py-4">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-[#1A1817] tracking-tight">
                    Viết Đánh Giá
                  </h2>
                  <div className="w-10 h-[1px] bg-[#649692] mx-auto mt-4 opacity-50" />
                  <p className="text-[#8C8C8C] text-[10px] mt-4 uppercase tracking-[0.4em] font-medium">{data?.result?.Name}</p>
                </div>
                <div className="space-y-6">
                  <p className="text-[10px] font-bold text-[#1A1817] text-left uppercase tracking-[0.3em]">Cảm nhận của bạn</p>
                  <div className="flex justify-left text-[#649692] text-4xl space-x-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer"
                        onClick={() => setRating(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        {i <= (hoverRating || rating) ? <FaStar /> : <FaRegStar className="opacity-10" />}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap justify-left gap-4">
                    <label className="group relative w-20 h-20 flex flex-col items-center justify-center bg-white border border-[#E8E8E8] cursor-pointer hover:border-[#649692] transition-colors duration-500">
                      <FaCamera className="text-[#8C8C8C] group-hover:text-[#649692] transition-colors" size={20} />
                      <input onChange={handleGetImage} type="file" className="hidden" multiple accept="image/*" />
                    </label>

                    {images.map((image, index) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={index}
                        onClick={() => handleDeleteImage(image, index)}
                        className="relative w-20 h-20 group cursor-pointer border border-[#E8E8E8]"
                      >
                        <img src={image} alt={`upload-${index}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                          <FaTimes className="text-white scale-75" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-[#E8E8E8] py-4 text-[#1A1817] placeholder-[#C0C0C0] focus:outline-none focus:border-[#649692] transition-all duration-700 resize-none text-sm leading-relaxed"
                    placeholder="Hãy chia sẻ câu chuyện của bạn ở đây..."
                    onChange={handleGetvalue}
                    name="content"
                  />
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white font-bold text-[10px] uppercase tracking-[0.4em] transition-all duration-400 active:scale-[0.98]"
                  >
                    {isLoading ? <Loading /> : "Gửi đi"}
                  </button>
                </div>
              </div>
            </ModalComment>
          )}
        </AnimatePresence>

        {/* Sidebar Header (Atelier Style) */}
        <div className="flex justify-between items-start mb-20">
          <div className="space-y-2">
            <p className="text-[9px] text-[#649692] uppercase tracking-[0.5em] font-bold opacity-60">ESSENTIALS</p>
            <h2 className="text-4xl font-bold text-[#1A1817] tracking-tight">Đánh Giá</h2>
          </div>
          <motion.button
            whileHover={{ opacity: 0.5 }}
            className="text-[#1A1A1A] transition-opacity duration-300"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </motion.button>
        </div>

        {/* Rating Overview (Minimalist Gallery) */}
        <div className="mb-20 space-y-12">
          <div className="flex items-end justify-between border-b border-[#E8E8E8] pb-10">
            <div className="flex items-baseline gap-6">
              <span className="text-8xl font-bold text-[#1A1817] leading-none">
                {dataReviews?.Product?.Rating ? Number(dataReviews.Product.Rating).toFixed(1) : "5.0"}
              </span>
              <div className="space-y-2">
                <ReactStars
                  count={5}
                  size={12}
                  value={dataReviews?.Product?.Rating ? Number(dataReviews.Product.Rating) : 5}
                  isHalf={true}
                  edit={false}
                  activeColor="#649692"
                />
                <p className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-[0.3em]">
                  {dataReviews?.result?.length || 0} Trải nghiệm
                </p>
              </div>
            </div>
            <div className="pb-2">
              <span className="text-[10px] font-bold text-[#649692] uppercase tracking-[0.2em]">Atelier Quality</span>
            </div>
          </div>

          <button
            disabled={!user}
            onClick={handleOpenModal}
            className={`w-full py-5 border border-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-400 ${!user
              ? "opacity-20 cursor-not-allowed"
              : "hover:bg-[#1A1A1A] hover:text-white"
              }`}
          >
            {user ? "Viết cảm nhận của bạn tại đây!" : "Đăng nhập để chia sẻ"}
          </button>
        </div>

        {/* Review List (Clean Journal Entries) */}
        <div className="space-y-16">
          <div className="flex items-center gap-6">
            <h3 className="text-[10px] font-bold text-[#1A1817] uppercase tracking-[0.4em]">BÌNH LUẬN</h3>
            <div className="flex-1 h-[1px] bg-[#E8E8E8]" />
          </div>

          <div className="space-y-12">
            {dataReviews?.result?.length <= 0 && !isLoadingReview && (
              <div className="py-20 text-center border-t border-b border-[#F0F0F0]">
                <p className="text-[#8C8C8C] text-[10px] font-medium uppercase tracking-[0.3em]">Hiện chưa có lời nhắn nào.</p>
              </div>
            )}

            {isLoadingReview ? (
              Array(2).fill().map((_, index) => <ReviewItemSkeleton key={index} />)
            ) : (
              dataReviews?.result?.map((review, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  key={index}
                  className="group"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-6">
                      <div className="grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img
                          src={review?.Id_User?.Image?.path || "https://i.pinimg.com/1200x/b7/5b/29/b75b29441bbd967deda4365441497221.jpg"}
                          alt="avatar"
                          className="w-12 h-12 object-cover border border-[#F0F0F0]"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#1A1817] text-lg tracking-tight">{review?.Id_User?.Name}</h4>
                        <div className="flex items-center gap-4">
                          <ReactStars count={5} size={10} value={review?.Rating} edit={false} activeColor="#649692" />
                          <span className="text-[9px] text-[#8C8C8C] font-semibold uppercase tracking-widest opacity-60">
                            {dayjs(review?.CreateAt).fromNow()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#5C5C5C] leading-relaxed border-l-2 border-[#F4F1EE] pl-6 py-1">
                    "{review?.Content}"
                  </p>

                  {review?.Images?.length > 0 && (
                    <div className="flex gap-4 mt-8 pb-4 overflow-x-auto no-scrollbar grayscale group-hover:grayscale-0 transition-all duration-1000">
                      {review?.Images.map((img, i) => (
                        <img
                          key={i}
                          src={img?.url}
                          alt="review"
                          className="w-24 h-32 object-cover border border-[#F0F0F0] flex-shrink-0 cursor-zoom-in"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-10 mt-10">
                    <button
                      onClick={() => handleLike(review?._id)}
                      className={`text-[9px] font-bold tracking-[0.3em] transition-colors duration-500 uppercase ${localLikedCommentIds === review?._id || dataLikeComment?.result?.some((item) => item?.CommentId?._id === review?._id)
                        ? "text-[#649692]"
                        : "text-[#C0C0C0] hover:text-[#1A1A1A]"
                        }`}
                    >
                      Yêu thích ({review?.Likes || 0})
                    </button>
                    <button
                      onClick={() => handleReply(review?._id)}
                      className="text-[9px] font-bold text-[#C0C0C0] hover:text-[#1A1A1A] tracking-[0.3em] transition-all duration-500 uppercase"
                    >
                      Phản hồi
                    </button>
                  </div>

                  {openReply.id_Review === review?._id && openReply.isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8"
                    >
                      <input
                        type="text"
                        placeholder="Viết phản hồi..."
                        className="w-full bg-transparent border-b border-[#E8E8E8] py-3 text-[11px] focus:outline-none focus:border-[#649692] transition-colors duration-500"
                      />
                    </motion.div>
                  )}

                  <div className="h-[1px] w-full bg-[#F0F0F0] mt-16" />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSidebar;
