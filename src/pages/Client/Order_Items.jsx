import { PiInvoice } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
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
import { AnimatePresence } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { requestCancleOrder } from "../../services/Client/Order";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import Cart404empty from "../../components/Cart404";
const Order_Items = () => {
  const scrollRef = useRef(null);
  const btnRefs = useRef([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [typeModal, setTypeModal] = useState({ type: "", modal: false });
  const [status, setStatus] = useState({
    status: "Đơn hàng",
  });
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
  const [valueCancle, setValueCancle] = useState({
    reason: "",
    note: "",
  });

  const handleGetvalueReson = (e) => {
    const { name, value } = e.target;
    setValueCancle((prev) => ({ ...prev, [name]: value }));
  };
  const mutationCancle = useMutation({
    mutationKey: ["cancle-order"],
    mutationFn: (data) => requestCancleOrder(data),
    onSuccess: (data) => {
      setTimeout(() => {
        setTypeModal({ type: "", modal: false });
        setIsLoading(false);
        toast.success("Yêu cầu huỷ đơn hàng thành công, vui lòng chờ xác nhận");
      }, 2000);
    },
    onError: (error) => {
      if (error.status === 400) {
        setTimeout(() => {
          setTypeModal({ type: "", modal: false });
          setIsLoading(false);
          toast.error("Bạn đã gửi yêu cầu hủy đơn hàng trước đó rồi , vui lòng chờ xác nhận !");
        }, 2000);
      }
    },
  });

  const handleSenReqCancleOrder = (orderId) => {
    if (!valueCancle.reason) {
      return toast.warning("Vui lòng chọn lý do huỷ đơn hàng");
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
    setTypeModal({ type: "reqCancle", modal: true });
    setCancleIdOrder(orderId);
  };

  const handleCallStatus = (item, index) => {
    setCurrentTab(index);
    setStatus((prev) => ({ ...prev, status: item }));
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
    setTypeModal({ type: "detailOrder", modal: true });
    setDeitalOrder((prev) => ({ ...prev, order }));
  };
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // console.log("wrapperRef.current", wrapperRef.current);

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
      document.body.style.overflow = "hidden"; // khoá scroll
    } else {
      document.body.style.overflow = ""; // mở lại scroll
    }

    // Cleanup khi component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [typeModal.modal]);

  return (
    <section className="lg:max-w-7xl mx-auto lg:w-full h-full mt-20 w-[380px] ">
      <div>
        <AnimatePresence>
          {typeModal.type === "detailOrder" && (
            <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal} wrapperRef={wrapperRef}>
              <div className="max-w-5xl mx-auto p-6 bg-white lg:rounded-2xl h-full ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chi tiết đơn hàng</h2>

                {/* Thông tin đơn hàng */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Thông tin đơn hàng</h3>
                    <p>
                      <span className="font-medium">Mã đơn:</span> #{detailOrder.order.orderInfo._id}
                    </p>
                    <p>
                      <span className="font-medium">Ngày đặt:</span> {new Date(detailOrder.order.orderInfo.CreateAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Trạng thái:</span>
                      <span
                        className={`ml-1 px-2 py-1 rounded-full text-sm font-semibold
              ${
                detailOrder.order.orderInfo.Status === "Đã giao"
                  ? "bg-green-100 text-green-700"
                  : detailOrder.order.orderInfo.Status === "Chờ xác nhận"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
                      >
                        {detailOrder.order.orderInfo.Status}
                      </span>
                    </p>
                  </div>

                  {/* Địa chỉ giao hàng */}
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Địa chỉ nhận hàng</h3>
                    <p className="flex space-x-1">
                      <span className="font-medium">Tên:</span> {detailOrder.order.orderInfo.Fullname}
                      <span className="ml-2 mr-2">(84)</span>
                      <span className="text-gray-500">{detailOrder.order.orderInfo.Phone.slice(1).replace(/(\d{3})(?=\d)/g, "$1 ")}</span>
                    </p>
                    {/* <p>
                    <span className="font-medium">SĐT:</span> {detailOrder.order.orderInfo.Phone}
                  </p> */}
                    <p>
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {detailOrder.order.orderInfo.Address.replace(/(Thành phố|Tỉnh)/g, " - $1")
                        ?.replace(/(Quận|Huyện|Thị xã)/g, " - $1")
                        ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                        ?.replace(/^ - /, "")}
                    </p>
                  </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="mb-6 h-[300px] overflow-hidden overflow-y-auto hide-scrollbar">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Sản phẩm</h3>
                  <div className="">
                    {detailOrder.order.items.map((item) => (
                      <div>
                        <div key={item._id} className="flex items-center py-4 gap-4">
                          <img src={item.Image} alt={item.Name} className="w-16 h-16 rounded object-cover" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.Name}</p>
                            <p className="text-sm text-gray-500">Số lượng: {item.Quantity}</p>
                            <p className="text-sm text-gray-500">Màu sắc: {item.Color}</p>
                            <p className="text-sm text-gray-500">Size: {item.Size}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">{item.Price.toLocaleString("vi-VN")}₫</p>
                          </div>
                        </div>
                        <hr className="border-t-1 border-gray-300 w-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="text-right border-t pt-4">
                  <p className="text-lg font-semibold text-gray-800">
                    Tổng tiền: {detailOrder.order?.orderInfo?.TotalAmount.toLocaleString("vi-VN")}₫
                  </p>
                </div>

                <div className="flex lg:justify-end justify-center items-center space-x-2 mt-5">
                  <button
                    onClick={() => setTypeModal({ modal: false })}
                    className="lg:w-35 w-1/2 h-11 rounded-md border-1 border-gray-400  cursor-pointer hover:bg-black hover:text-white transform duration-300 ease-in-out"
                  >
                    <span>Đóng</span>
                  </button>
                  <button className="lg:w-35 w-1/2 h-11 rounded-md border-1 border-teal-500 cursor-pointer hover:bg-teal-500 hover:text-white transform duration-300 ease-in-out">
                    <span>Mua lại</span>
                  </button>
                </div>
              </div>
            </ModalOrder>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {typeModal.type === "reqCancle" && (
          <ModalOrder typeModal={typeModal} setTypeModal={setTypeModal} wrapperRef={wrapperRef}>
            <div className="max-w-2xl w-140 mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">🛑 Yêu cầu hủy đơn hàng</h1>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Mã đơn hàng</label>
                <input
                  type="text"
                  value={"#" + cancleIdOrder}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Lý do hủy đơn</label>
                <select
                  // value={reason}
                  name="reason"
                  onChange={(e) => handleGetvalueReson(e)}
                  className="w-full border px-3 py-2 rounded-lg"
                >
                  <option value="">-- Chọn lý do --</option>
                  <option value="Tôi dổi ý">Tôi đổi ý</option>
                  <option value="Tìm sản phẩm tốt hơn">Tìm sản phẩm tốt hơn</option>
                  <option value="Thời gian giao hàng lâu">Thời gian giao hàng lâu</option>
                  <option value="Lý do khác">Lý do khác</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-1">
                  <label className="block font-medium mb-1">Ghi chú thêm (tuỳ chọn)</label>
                </label>
                <textarea
                  name="note"
                  onChange={(e) => handleGetvalueReson(e)}
                  rows="5"
                  placeholder="Ví dụ: Tôi đặt nhầm sản phẩm, đổi ý sau khi đặt hàng..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => setTypeModal({ modal: false })}
                  type="button"
                  className="w-25 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 "
                >
                  Đóng
                </button>
                <button
                  onClick={() => handleSenReqCancleOrder(cancleIdOrder)}
                  type="button"
                  className="lg:w-full w-35 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {isLoading ? <Loading /> : "Gửi yêu cầu"}
                </button>
              </div>
            </div>
          </ModalOrder>
        )}
      </AnimatePresence>
      <div>
        {/* {isPending  ? <>
                      <Skeleton height={120} />
                      <Skeleton height={20} className="mt-2" />
                      <Skeleton width={100} height={20} />
                    </> : "đã load"} */}
        <h1 className="mb-10 font-semibold text-xl">Đơn hàng của bạn</h1>
        <div className="flex items-center  ">
          <div ref={scrollRef} className="lg:space-x-5 w-full overflow-x-auto scroll-smooth whitespace-nowrap  py-2">
            {["Đơn hàng", "Chờ xác nhận", "Chờ giao hàng", "Đã giao", "Đã hủy"].map((item, index) => (
              <button
                ref={(el) => (btnRefs.current[index] = el)}
                onClick={() => handleCallStatus(item, index)}
                key={index}
                className={`min-w-31 h-10 rounded-md text-black cursor-pointer transform duration-200 ease-in-out ${
                  currentTab === index ? "bg-teal-500 text-white" : ""
                }`}
              >
                <span>{item}</span>
              </button>
            ))}
            {/* <button className="w-35 h-8 rounded-md text-black cursor-pointer">
              <span>Đã thanh toán</span>
            </button>
            <button className="w-35 h-8 rounded-md text-black cursor-pointer">
              <span>Đã hủy</span>
            </button> */}
          </div>
        </div>
        {!isLoadingOrderItems && !data?.allOrderItems ? (
          <Cart404empty type={"orderItems"} />
        ) : isPending ? (
          Array(1)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="h-130 w-full shadow-md mt-5 rounded-xl p-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <Skeleton width={100} height={16} />
                    <Skeleton width={200} height={20} />
                  </div>
                  <Skeleton width={120} height={40} />
                </div>

                {/* Thông tin đơn */}
                <div className="flex flex-wrap lg:space-x-20 space-x-7 text-md">
                  <Skeleton width={100} height={16} />
                  <Skeleton width={120} height={16} />
                  <Skeleton width={250} height={16} />
                </div>

                {/* Thanh đánh giá */}
                <div className="w-full h-10 rounded-xl bg-yellow-50 mt-5 p-3 flex items-center justify-between">
                  <Skeleton width={250} height={16} />
                  <Skeleton width={20} height={20} />
                </div>

                {/* Danh sách sản phẩm trong đơn */}
                {Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="mt-5 pb-5">
                      <Skeleton width={150} height={20} />
                      <div className="flex mt-3">
                        <Skeleton width={100} height={100} />
                        <div className="ml-3 flex flex-col space-y-2">
                          <Skeleton width={200} height={20} />
                          <Skeleton width={300} height={14} />
                          <div className="flex space-x-4">
                            <Skeleton width={100} height={20} />
                            <Skeleton width={100} height={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))
        ) : (
          <>
            {data?.allOrderItems?.map((orderBlock) => (
              <div>
                <div className={` w-full shadow-md mt-5 rounded-xl mb-10`}>
                  <div
                    className={`max-w-6xl mx-auto pt-5 transform duration-300 ease-in-out ${
                      orderBlock?.items.length > 3 && !viewMore?.includes(orderBlock.orderInfo._id)
                        ? "max-h-150 overflow-hidden"
                        : orderBlock?.items.length > 3 && viewMore?.includes(orderBlock.orderInfo._id)
                        ? "max-h-[1000px]"
                        : "h-auto"
                    } `}
                  >
                    <div className="flex justify-between items-center mb-5">
                      <div className="lg:w-full md:w-full w-25 truncate">
                        <h2 className="text-gray-400">Mã đơn hàng:</h2>
                        <span className="font-semibold ">#{orderBlock.orderInfo._id}</span>
                      </div>
                      <div className="space-x-3 flex">
                        {orderBlock.orderInfo?.Status === "Chờ xác nhận" && (
                          <button
                            className="w-30 h-10 rounded-lg border-1 border-gray-300 cursor-pointer relative overflow-hidden group"
                            onClick={() => handleReqCancle(orderBlock.orderInfo._id)}
                          >
                            <span className="relative z-5 group-hover:text-white text-black transition duration-600 ">Yêu cầu hủy</span>
                            <span
                              className={`absolute left-0 top-0 w-full h-full bg-gradient-to-r from-teal-400 to-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out`}
                            ></span>
                          </button>
                        )}
                        <button
                          className="w-30 h-10 rounded-lg border-1 border-gray-300 cursor-pointer relative overflow-hidden group"
                          onClick={() => handleSeendeitalOrder(orderBlock)}
                        >
                          <span className="relative z-5 group-hover:text-white text-black transition duration-600 ">Xem chi tiết</span>
                          <span
                            className={`absolute left-0 top-0 w-full h-full bg-gradient-to-r from-teal-400 to-teal-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out`}
                          ></span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex justify-center items-center lg:space-x-20 space-x-7 text-md">
                        <div>
                          <h2 className="text-gray-400">Ngày đặt:</h2>
                          {/* <span className="font-semibold">{new Date(orderBlock.orderInfo.CreateAt).toLocaleDateString("vi-VN")}</span> */}
                        </div>
                        <div>
                          <h2 className="text-gray-400">Tổng tiền:</h2>
                          {/* <span className="font-semibold">
                      {orderBlock.orderInfo.TotalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </span> */}
                        </div>
                        <div>
                          <h2 className="text-gray-400">Địa chỉ:</h2>
                          {/* <span className="font-semibold">
                      {orderBlock?.orderInfo?.Address?.replace(/(Thành phố|Tỉnh)/g, " - $1")
                        ?.replace(/(Quận|Huyện)/g, " - $1")
                        ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                        ?.replace(/^ - /, "")}
                    </span> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center lg:space-x-20 space-x-7 text-md">
                      <span className="font-semibold">{new Date(orderBlock.orderInfo.CreateAt).toLocaleDateString("vi-VN")}</span>
                      <span className="font-semibold">
                        {orderBlock.orderInfo.TotalAmount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                      </span>
                      <span className="font-semibold line-clamp-1">
                        {orderBlock?.orderInfo?.Address?.replace(/(Thành phố|Tỉnh)/g, " - $1")
                          ?.replace(/(Quận|Huyện|Thị xã)/g, " - $1")
                          ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                          ?.replace(/^ - /, "")}
                      </span>
                    </div>
                    {/* <h1 className="text-2xl font-semibold">Oder Tracking</h1> */}
                    <hr className="text-gray-300 w-full mt-5 " />
                    {orderBlock.orderInfo.Status === "Đã giao" && (
                      <div className="w-full flex items-center justify-between h-fit rounded-xl bg-yellow-50 mt-5 p-1 text-yellow-500">
                        <Link
                          to={`/Products/Detail/${orderBlock?.items[0]?.Id_ProductVariants?.Id_Products?._id}`}
                          className="flex items-center space-x-2 "
                        >
                          <span>
                            <MdOutlineStarPurple500 />
                          </span>
                          <p>Vui lòng đánh giá trải nghiệm sản phẩm sau khi nhận hàng!</p>
                        </Link>
                        <span className="cursor-pointer">
                          <IoCloseSharp />
                        </span>
                      </div>
                    )}
                    {orderBlock?.items.map((item) => (
                      <div className="mt-5 pb-5">
                        {/* <h1 className="text-md font-semibold">Delivered May 10</h1> */}
                        <div className="flex mt-3">
                          <img className="w-25 h-25 object-contain" src={item.Image ? item.Image : item.Id_Product.ImageUrl.path} alt="" />
                          <div className="ml-3">
                            <h2 className="font-semibold">{item?.Id_ProductVariants?.Id_Products?.Name}</h2>
                            <p className="text-gray-400 ">Hỗ trợ đổi trả 100%</p>
                            {/* <div>
                            <p className="font-bold">Màu sắc : <span className="font-normal">{item?.Id_ProductVariants?.Color}</span></p>
                            <p className="font-bold">Size : <span className="font-normal">{item?.Id_ProductVariants?.Size}</span></p>
                          </div> */}
                            <div className="flex space-x-5 items-center text-blue-700  mt-3">
                              <span className="flex items-center space-x-1 cursor-pointer font-medium">
                                <RiArrowLeftRightLine />
                                <span>Mua lại</span>
                              </span>
                              <span className="text-[13px]">|</span>
                              <span className="flex items-center space-x-1 cursor-pointer font-medium">
                                <FaRegEye />
                                <span>Xem sản phẩm</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {orderBlock?.items.length > 3 && (
                    <div className="flex justify-center pb-4">
                      <button
                        onClick={() => handleViewMore(orderBlock.orderInfo._id)}
                        className="font-semibold cursor-pointer hover:text-red-500 transform duration-200 ease-in-out"
                      >
                        {viewMore?.includes(orderBlock.orderInfo._id) ? "Thu gọn" : "Xem thêm"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Order_Items;
