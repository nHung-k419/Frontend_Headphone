import { PiInvoice } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoCloseSharp, IoChevronForward, IoBagHandleOutline, IoTimeOutline, IoWalletOutline, IoLocationOutline, IoTrashOutline } from "react-icons/io5";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { getOrderItems } from "../../services/Client/Order";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import ModalOrder from "../../components/ModalOrder/ModalOrder";
import { AnimatePresence, motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { requestCancleOrder } from "../../services/Client/Order";
import Loading from "../../components/Loading";
import { Toaster, toast } from "sonner";
import Cart404empty from "../../components/Cart404";

const Order_Items = () => {
  const scrollRef = useRef(null);
  const btnRefs = useRef([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [status, setStatus] = useState({ status: "Đơn hàng" });
  const [isLoading, setIsLoading] = useState(false);
  const [viewMore, setViewMore] = useState([]);
  const [detailOrder, setDeitalOrder] = useState({});
  const [cancleIdOrder, setCancleIdOrder] = useState(null);
  const user = localStorage.getItem("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";

  const {
    data,
    isPending,
    isLoading: isLoadingOrderItems,
  } = useQuery({
    queryKey: ["order-items", idUser, status.status],
    queryFn: () => getOrderItems({ Id_User: idUser, status }),
  });

  const [valueCancle, setValueCancle] = useState({ reason: "", note: "" });

  const handleGetvalueReson = (e) => {
    const { name, value } = e.target;
    setValueCancle((prev) => ({ ...prev, [name]: value }));
  };

  const mutationCancle = useMutation({
    mutationKey: ["cancle-order"],
    mutationFn: (data) => requestCancleOrder(data),
    onSuccess: () => {
      setTimeout(() => {
        setTypeModal({ type: "", modal: false });
        setIsLoading(false);
        toast.success("Yêu cầu hủy đơn hàng thành công, vui lòng chờ xác nhận");
      }, 2000);
    },
    onError: (error) => {
      if (error.status === 400) {
        setTimeout(() => {
          setTypeModal({ type: "", modal: false });
          setIsLoading(false);
          toast.error("Bạn đã gửi yêu cầu hủy đơn hàng trước đó rồi, vui lòng chờ xác nhận!");
        }, 2000);
      }
    },
  });

  const handleSenReqCancleOrder = (orderId) => {
    if (!valueCancle.reason) {
      return toast.warning("Vui lòng chọn lý do hủy đơn hàng");
    }
    setIsLoading(true);
    const data = {
      orderId: orderId,
      reason: valueCancle.reason,
      note: valueCancle.note,
      userId: idUser,
    };
    mutationCancle.mutate(data);
  };

  const handleViewMore = (id) => {
    setViewMore((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleReqCancle = (orderId) => {
    setCancleIdOrder(orderId);
    setTypeModal({ type: "reqCancle", modal: true });
  };

  const handleCallStatus = (item, index) => {
    setCurrentTab(index);
    setStatus({ status: item });
    const nextEl = btnRefs.current[index];
    if (nextEl) {
      nextEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleSeendeitalOrder = (order) => {
    setDeitalOrder({ order });
    setTypeModal({ type: "detailOrder", modal: true });
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setTypeModal({ type: "", modal: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeModal.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [typeModal.modal]);

  const StatusBadge = ({ status }) => {
    const config = {
      "Đã giao": "bg-emerald-50 text-emerald-700",
      "Chờ xác nhận": "bg-amber-50 text-amber-700",
      "Chờ giao hàng": "bg-blue-50 text-blue-700",
      "Đã hủy": "bg-red-50 text-red-700",
      "Yêu cầu hủy": "bg-gray-100 text-gray-700",
    };
    return (
      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${config[status] || "bg-gray-50 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20 px-4 md:px-8 font-sans selection:bg-emerald-100 text-[#2D2D2D]">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Boutique Header */}
        <div className="border-b border-[#E5E2D9] pb-8">
          <h1 className="text-3xl font-light tracking-tight">Đơn hàng của bạn</h1>
          <p className="text-[#8C8C8C] text-[10px] tracking-[0.2em] mt-2 uppercase flex items-center gap-2">
            <span className="w-1 h-1 bg-emerald-600 rounded-full"></span>
            Lịch sử mua hàng & Theo dõi vận chuyển
          </p>
        </div>

        {/* Navigation Tabs - Boutique Minimalist */}
        <div className="flex border-b border-[#F0EEE6] overflow-x-auto hide-scrollbar sticky top-20 bg-[#FAF9F6]/95 backdrop-blur-sm z-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          {["Đơn hàng", "Chờ xác nhận", "Chờ giao hàng", "Đã giao", "Đã hủy"].map((item, index) => (
            <button
              key={index}
              ref={(el) => (btnRefs.current[index] = el)}
              onClick={() => handleCallStatus(item, index)}
              className={`pb-4 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 relative whitespace-nowrap
                ${currentTab === index ? "text-emerald-700" : "text-[#8C8C8C] hover:text-[#2D2D2D]"}`}
            >
              {item}
              {currentTab === index && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700" />
              )}
            </button>
          ))}
        </div>

        {/* Order List Area */}
        <div className="space-y-8">
          {!isLoadingOrderItems && !data?.allOrderItems ? (
            <Cart404empty type={"orderItems"} />
          ) : isPending ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-6 shadow-sm border border-[#F0EEE6]">
                  <Skeleton height={20} width={150} className="mb-4" />
                  <Skeleton count={3} />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {data?.allOrderItems?.map((orderBlock) => (
                <motion.div
                  layout
                  key={orderBlock.orderInfo._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-l border-r border-t border-b border-[#E5E2D9] shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
                >
                  {/* Order Summary Row */}
                  <div className="bg-[#FAF9F6] px-6 py-5 flex flex-wrap items-center justify-between gap-6 border-b border-[#E5E2D9]">
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#8C8C8C] uppercase tracking-widest font-bold">Mã định danh</p>
                      <p className="text-sm font-medium">#{orderBlock.orderInfo._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#8C8C8C] uppercase tracking-widest font-bold">Ngày thực hiện</p>
                      <p className="text-sm font-light tracking-wide">
                        {new Date(orderBlock.orderInfo.CreateAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#8C8C8C] uppercase tracking-widest font-bold">Tổng thanh toán</p>
                      <p className="text-sm font-semibold text-emerald-700 tracking-wider">
                        {orderBlock.orderInfo.TotalAmount.toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                    <div>
                      <StatusBadge status={orderBlock.orderInfo.Status} />
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-6 py-3 bg-white flex justify-end gap-4 border-b border-[#F0EEE6]">
                    <button
                      onClick={() => handleSeendeitalOrder(orderBlock)}
                      className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8C8C8C] hover:text-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <FaRegEye size={12} /> Chi tiết
                    </button>
                    {orderBlock.orderInfo?.Status === "Chờ xác nhận" && (
                      <button
                        onClick={() => handleReqCancle(orderBlock.orderInfo._id)}
                        className="text-[9px] uppercase tracking-[0.2em] font-bold text-red-400 hover:text-red-700 transition-colors flex items-center gap-2"
                      >
                        <IoTrashOutline size={12} /> Hủy đơn
                      </button>
                    )}
                  </div>

                  {/* Product List Content */}
                  <div className={`p-6 transition-all duration-500 ${orderBlock?.items.length > 2 && !viewMore?.includes(orderBlock.orderInfo._id) ? "max-h-80 overflow-hidden relative" : "h-auto"}`}>
                    <div className="space-y-6">
                      {orderBlock?.items.map((item, idx) => (
                        <div key={idx} className="flex gap-6 group/item">
                          <div className="w-16 h-16 bg-[#F0EEE6] flex-shrink-0">
                            <img src={item.Image} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover/item:scale-105 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <h3 className="text-xs font-medium text-[#2D2D2D] truncate hover:text-emerald-700 transition-colors cursor-pointer">
                              {item?.Id_ProductVariants?.Id_Products?.Name}
                            </h3>
                            <p className="text-[9px] text-[#8C8C8C] uppercase tracking-widest space-x-3">
                              <span>Màu: {item.Color}</span>
                              <span>•</span>
                              <span>Size: {item.Size}</span>
                            </p>
                            <div className="flex justify-between items-baseline pt-1">
                              <span className="text-[10px] text-[#8C8C8C]">Số lượng: {item.Quantity}</span>
                              <span className="text-xs font-light tracking-wide">{item.Price.toLocaleString("vi-VN")}₫</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gradient Overlay for collapsed state */}
                    {orderBlock?.items.length > 2 && !viewMore?.includes(orderBlock.orderInfo._id) && (
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-white/0 flex items-end justify-center pb-4">
                        <button
                          onClick={() => handleViewMore(orderBlock.orderInfo._id)}
                          className="px-4 py-1.5 bg-white border border-[#E5E2D9] text-[9px] uppercase tracking-widest font-bold hover:bg-[#FAF9F6] transition-colors"
                        >
                          Xem thêm {orderBlock.items.length - 2} sản phẩm
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Footer Action if Fully Visible */}
                  {viewMore?.includes(orderBlock.orderInfo._id) && (
                    <div className="px-6 pb-6 flex justify-center">
                      <button
                        onClick={() => handleViewMore(orderBlock.orderInfo._id)}
                        className="text-[9px] uppercase tracking-widest font-bold text-[#8C8C8C] hover:text-[#2D2D2D]"
                      >
                        Thu gọn
                      </button>
                    </div>
                  )}

                  {/* Interaction Message */}
                  {orderBlock.orderInfo.Status === "Đã giao" && (
                    <div className="mx-6 mb-6 p-3 bg-emerald-50 border border-emerald-100 flex items-center justify-between text-[10px] text-emerald-700">
                      <div className="flex items-center gap-2">
                        <MdOutlineStarPurple500 size={14} />
                        <span className="font-medium">Vui lòng đánh giá trải nghiệm sản phẩm để giúp chúng tôi hoàn thiện hơn!</span>
                      </div>
                      <Link to={`/Products/Detail/${orderBlock?.items[0]?.Id_ProductVariants?.Id_Products?._id}`} className="font-bold uppercase tracking-widest hover:underline">
                        Đánh giá ngay
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Detail Modal Overhaul */}
      <AnimatePresence>
        {typeModal.type === "detailOrder" && (
          <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal} wrapperRef={wrapperRef}>
            <div className="w-full max-w-2xl bg-white p-8 rounded-sm space-y-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="border-b border-[#F0EEE6] pb-4 flex justify-between items-center">
                <h2 className="text-xl font-light tracking-tight">Chi tiết đơn hàng</h2>
                <StatusBadge status={detailOrder.order.orderInfo.Status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Thông tin chung</h3>
                  <div className="space-y-1.5">
                    <p><span className="text-[#8C8C8C]">Mã đơn:</span> #{detailOrder.order.orderInfo._id}</p>
                    <p><span className="text-[#8C8C8C]">Ngày đặt:</span> {new Date(detailOrder.order.orderInfo.CreateAt).toLocaleString()}</p>
                    <p><span className="text-[#8C8C8C]">Thanh toán:</span> {detailOrder.order.orderInfo.PaymentMethod === "COD" ? "Tiền mặt" : "Zalopay"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Nơi nhận hàng</h3>
                  <div className="space-y-1.5">
                    <p className="font-bold">{detailOrder.order.orderInfo.Fullname}</p>
                    <p className="text-[#8C8C8C]">(+84) {detailOrder.order.orderInfo.Phone}</p>
                    <p className="leading-relaxed text-[#555]">{detailOrder.order.orderInfo.Address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C8C]">Danh mục sản phẩm</h3>
                <div className="border-t border-[#F0EEE6] divide-y divide-[#F0EEE6]">
                  {detailOrder.order.items.map((item, idx) => (
                    <div key={idx} className="py-4 flex items-center gap-6">
                      <div className="w-16 h-16 bg-[#F0EEE6] p-1">
                        <img src={item.Image} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.Name}</p>
                        <p className="text-[9px] text-[#8C8C8C] uppercase tracking-widest mt-0.5">
                          {item.Color} • {item.Size} • SL: {item.Quantity}
                        </p>
                      </div>
                      <p className="text-xs font-light tracking-wide">{item.Price.toLocaleString("vi-VN")}₫</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#F0EEE6] pt-6 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Tổng giá trị đơn hàng</span>
                <span className="text-xl font-light text-emerald-700 tracking-wider">
                  {detailOrder.order.orderInfo.TotalAmount.toLocaleString("vi-VN")}₫
                </span>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setTypeModal({ modal: false })}
                  className="bg-[#2D2D2D] text-white px-10 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          </ModalOrder>
        )}

        {/* Cancel Modal Overhaul */}
        {typeModal.type === "reqCancle" && (
          <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal} wrapperRef={wrapperRef}>
            <div className="w-full max-w-lg bg-white p-8 rounded-sm space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 text-red-600 border-b border-[#F0EEE6] pb-4">
                <IoTrashOutline size={20} />
                <h2 className="text-xl font-light tracking-tight">Yêu cầu hủy đơn hàng</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">Mã đơn hàng</label>
                  <p className="text-xs font-mono font-medium">#{cancleIdOrder}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">Lý do hủy đơn</label>
                  <select
                    name="reason"
                    onChange={handleGetvalueReson}
                    className="w-full border-b border-[#E5E2D9] py-2 text-xs focus:outline-none focus:border-emerald-600 bg-transparent"
                  >
                    <option value="">-- Chọn lý do --</option>
                    <option value="Tôi đổi ý">Tôi đổi ý</option>
                    <option value="Tìm sản phẩm tốt hơn">Tìm sản phẩm tốt hơn</option>
                    <option value="Thời gian giao hàng lâu">Thời gian giao hàng lâu</option>
                    <option value="Lý do khác">Lý do khác</option>
                  </select>
                </div>

                <div className="space-y-1 relative pt-2">
                  <label className="text-[9px] uppercase tracking-widest text-[#8C8C8C]">Ghi chú (tùy chọn)</label>
                  <textarea
                    name="note"
                    onChange={handleGetvalueReson}
                    rows="3"
                    className="w-full border border-[#E5E2D9] p-3 text-xs focus:outline-none focus:border-emerald-600 mt-2 bg-[#FAF9F6] resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setTypeModal({ modal: false })} className="text-[10px] uppercase font-bold tracking-widest text-[#8C8C8C] px-4">Hủy bỏ</button>
                <button
                  onClick={() => handleSenReqCancleOrder(cancleIdOrder)}
                  className="bg-red-600 text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-100 flex items-center justify-center min-w-[120px]"
                >
                  {isLoading ? <Loading /> : "Gửi yêu cầu"}
                </button>
              </div>
            </div>
          </ModalOrder>
        )}
      </AnimatePresence>

      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default Order_Items;
