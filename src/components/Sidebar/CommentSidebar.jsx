import { useEffect, useState } from "react";
import socket from "../../Socket";
import ModalComment from "../ModalComment/ModalComment";
import { FaStar, FaRegStar, FaCamera } from "react-icons/fa";
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
const CommentSidebar = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = Cookies?.get("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [value, setValue] = useState({
    content: "",
  });
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
      // console.log("success", data);
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
  console.log(dataReviews?.result);
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
    } else {
      const dataContent = {
        Content: value.content,
        Rating: rating,
        Images: [],
        Id_Product: id,
        Id_User: idUser,
      };
      queryClient.invalidateQueries(["getReviewsById", id]);
      socket.emit("sendReview", dataContent);
      setIsLoading(false);
      setTypeModal({ type: "", modal: false });
    }
  };

  const {
    data: dataLikeComment,
    isLoading: isLoadingLikeComment,
    refetch,
  } = useQuery({
    queryKey: ["getLikeComment", idUser],
    queryFn: () => GetLikeComment(idUser),
  });

  const [localLikedCommentIds, setLocalLikedCommentIds] = useState();
  const handleLike = (id_Review) => {
    socket.emit("likeReview", { userId: idUser, commentId: id_Review });
  };
  useEffect(() => {
    socket.on("newLike", (result) => {
      setLocalLikedCommentIds(result?.CommentId);
    });
  }, [localLikedCommentIds]);

  useEffect(() => {
    const handleNewLike = socket.on("newLike", (result) => {
      queryClient.invalidateQueries(["getLikeComment", idUser]);
    });
    return () => {
      socket.off("newLike", handleNewLike);
    };
  }, []);

  const [openReply, setOpenReply] = useState({ id_Review: "", isOpen: false });
  const handleReply = (id_Review) => {
    setOpenReply((prev) => ({ ...prev, id_Review, isOpen: !prev.isOpen }));
  };

  useEffect(() => {
    socket.on("newReview", (resultReview) => {
      console.log("🆕 Nhận review mới từ server:", resultReview);
      setCacheReview(resultReview);
    });
    return () => {
      socket.off("newReview");
    };
  }, []);

  const handleOpenModal = () => {
    setTypeModal({ type: "comment", modal: true });
  };
  const { data } = useQuery({
    queryKey: ["getDetailProduct", id],
    queryFn: () => getDetailProduct(id),
  });

  return (
    <div>
      {typeModal.modal && (
        <ModalComment typeModal={typeModal} setTypeModal={setTypeModal}>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{data?.result?.Name}</h2>

          {/* Rating */}
          <div className="mb-4">
            <p className="font-semibold text-gray-800 mb-1">Đánh giá</p>
            <div className="flex text-yellow-500 text-xl space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHoverRating(i)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {i <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
                </span>
              ))}
            </div>
          </div>

          {/* Upload image */}
          <div className="mb-4">
            <p className="text-gray-800 font-medium mb-2">Có thể cho chúng tôi xem các khoảnh khắc của bạn không?</p>
            <label className="border-2 border-dashed border-gray-300 w-40 h-28 flex flex-col items-center justify-center text-gray-600 rounded cursor-pointer hover:border-gray-400 transition">
              <FaCamera size={20} />
              <span className="mt-1 text-sm">Hình ảnh</span>
              <input onChange={(e) => handleGetImage(e)} type="file" className="hidden" multiple accept="image/*" />
            </label>
          </div>
          <div className="flex">
            {images.length > 0 && (
              <div className="mt-2 flex flex-wrap">
                {images.map((image, index) => (
                  <div key={index} onClick={() => handleDeleteImage(image, index)} className="mr-2 mb-2">
                    <img src={image} alt={`Image ${index}`} className="w-15 h-15 object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment box */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">Viết đánh giá từ 50 ký tự</label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500"
              placeholder="Hãy viết tại đây"
              onChange={(e) => handleGetvalue(e)}
              name="content"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button onClick={() => handleSubmit()} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded cursor-pointer">
              {isLoading ? <Loading /> : "Gửi"}
            </button>
          </div>
        </ModalComment>
      )}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-800">{data?.result?.Name}</h2>
        <button className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="mt-4 flex items-center space-x-3">
        <div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold">5</div>
        {/* <div className="flex text-yellow-500 space-x-1">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i}>★</span>
            ))}
        </div> */}
        {dataReviews?.Product?.Rating !== undefined && (
          <ReactStars count={5} size={17} value={Number(dataReviews.Product.Rating)} isHalf={true} edit={false} />
        )}
        <p className="text-gray-600 text-sm">{dataReviews?.result?.length} đánh giá</p>
      </div>
      <p className="text-sm text-gray-500 mt-2">Chúng tôi hướng tới những đánh giá thực tế 100%</p>
      <button
        disabled={!user}
        onClick={(e) => handleOpenModal()}
        className={`mt-4 px-4 py-2 bg-gray-200 text-gray-600 rounded ${
          !user ? "opacity-50 cursor-not-allowed" : "hover:bg-black hover:text-white cursor-pointer"
        } transform duration-300 ease-in-out`}
      >
        {user ? "VIẾT ĐÁNH GIÁ" : "Vui lòng đăng nhập"}
      </button>
      <div className=" flex items-center justify-center text-red-500 text-lg">
        {dataReviews?.result?.length <= 0 && "Hiện không có đánh giá nào"}
      </div>
      <div className="mt-6 space-y-6">
        {isLoadingReview ? (
          Array(3)
            .fill()
            .map((_, index) => <ReviewItemSkeleton />)
        ) : (
          <>
            {dataReviews?.result?.map((review, index) => (
              <div key={index} className="border-b pb-4 w-150 ">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      review?.Id_User?.Avatar ||
                      "https://tse3.mm.bing.net/th/id/OIP.D-GbAYTGDq2O0bGwwgmw2QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{review?.Id_User?.Name}</h4>
                    <p className="text-sm text-gray-500">Đã đánh giá: {new Date(review?.CreateAt).toLocaleDateString("vi-VN")}</p>
                  </div>
                </div>
                {/* <div className="mt-2 text-yellow-500">
              {Array(review?.Rating)
                .fill(0)
                .map((_, i) => (
                  <span key={i}>★</span>
                ))}
            </div> */}
                <ReactStars count={5} size={17} value={review?.Rating} isHalf={true} edit={false} />
                <p className="mt-2 text-gray-700">{review?.Content}</p>
                {review?.Images?.length > 0 && (
                  <div className="flex space-x-2 mt-2 cursor-pointer">
                    {review?.Images.map((img, i) => (
                      <img key={i} src={img?.url} alt="review" className="w-22 h-25 object-cover" />
                    ))}
                  </div>
                )}
                <div className="mt-2 text-sm text-black flex space-x-4">
                  <p className="font-semibold text-gray-500">{dayjs(review?.createdAt).fromNow().replace("trước", "").trim()}</p>
                  {/* {dataLikeComment?.result?.some((item) => item?.CommentId?._id === review?._id) ? <button onClick={() => handleLike(review?._id)} className={`cursor-pointer text-md ${dataLikeComment?.result?.some((item) => item?.CommentId?._id === review?._id) ? "text-blue-500" : ""}`}>Thích</button> : <button onClick={() => handleLike(review?._id)} className="cursor-pointer text-md">Thích</button>} */}
                  {/* {const isLike = dataLikeComment?.result?.some((item) => item?.CommentId?._id === review?._id)} */}

                  <button
                    onClick={() => handleLike(review?._id)}
                    className={`cursor-pointer text-md font-semibold  ${
                      localLikedCommentIds == review?._id || dataLikeComment?.result?.some((item) => item?.CommentId?._id === review?._id)
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    Thích
                  </button>
                  <button onClick={() => handleReply(review?._id)} className="cursor-pointer text-md">
                    <span>Trả lời</span>
                  </button>
                  {/* <button className="hover:text-blue-600">KHÔNG HỮU ÍCH</button> */}
                </div>
                {openReply.id_Review === review?._id && openReply.isOpen && (
                  <div className="w-full ">
                    <input type="text" className="w-full border-1 border-gray-300 h-10 focus:outline-none p-1 rounded-sm mt-3 relative" />
                    <span className="absolute mt-6 right-[70px] cursor-pointer">
                      <PiCursorClickFill />
                    </span>
                  </div>
                )}
                {/* <div className="ml-10 mt-5 bg-gray-200 p-2 rounded-md">
              <div className="flex items-center space-x-3">
              <img src={review?.Id_User?.Avatar || "https://tse2.mm.bing.net/th/id/OIP.yxqRw9Nq9fMHEnf9kHQ9nAHaHu?rs=1&pid=ImgDetMain&o=7&rm=3"} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <h4 className="font-semibold">{review?.Id_User?.Name}</h4>
                <p className="text-sm text-gray-500">Đã đánh giá: {new Date(review?.CreateAt).toLocaleDateString("vi-VN")}</p>
              </div>
            </div>
              <div className="flex space-x-3 mt-2">
                <p className="font-bold">Nguyễn Ngọc Hùng</p>
                <p className="whitespace-pre-wrap w-[370px]">Bạn có thể cho tôi xin trải nghiệm về sản phẩm bạn đã mua được không ?</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <span className="text-sm font-semibold">4 ngày</span>
                <button className="cursor-pointer text-sm font-semibold">Thích</button>
              </div>
            </div> */}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CommentSidebar;
