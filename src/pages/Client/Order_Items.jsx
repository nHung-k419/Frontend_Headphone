import { PiInvoice } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { GoPackage } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { getOrderItems } from "../../services/Client/Order";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Order_Items = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [ischeck, setIsCheck] = useState(false);
  const [status, setStatus] = useState({
    status: "Đơn hàng",
  });
  const user = Cookies?.get("User");
  const { id: idUser } = user ? JSON?.parse(user) : "";
  const { data, isPending } = useQuery({
    queryKey: ["order-items", idUser, status.status],
    queryFn: () => getOrderItems({ Id_User: idUser, status }),
  });

  const handleCallStatus = (item, index) => {
    setCurrentTab(index);
    setStatus((prev) => ({ ...prev, status: item }));
  };
  // console.log(status);

  return (
    <section className="lg:max-w-7xl mx-auto lg:w-full h-full mt-20 w-[380px] ">
      <div>
        {/* {isPending  ? <>
                      <Skeleton height={120} />
                      <Skeleton height={20} className="mt-2" />
                      <Skeleton width={100} height={20} />
                    </> : "đã load"} */}
        <h1 className="mb-10 font-semibold text-xl">Đơn hàng của bạn</h1>
        <div className="flex items-center  ">
          <div className="lg:space-x-5 w-full overflow-x-auto whitespace-nowrap px-2 py-2">
            {["Đơn hàng", "Chờ xác nhận", "Chờ giao hàng", "Đã giao", "Đã hủy"].map((item, index) => (
              <button
                onClick={() => handleCallStatus(item, index)}
                key={index}
                className={`min-w-31 h-10 rounded-md text-black cursor-pointer transform duration-200 ease-in-out ${
                  currentTab === index ? "bg-blue-600 text-white" : ""
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
        {isPending ? (
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
              <div className="h-full w-full shadow-md mt-5 rounded-xl">
                <div className="max-w-6xl mx-auto pt-5">
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-gray-400">Mã đơn hàng:</h2>
                      <span className="font-semibold">#{orderBlock.orderInfo._id}</span>
                    </div>
                    <div className="space-x-3">
                      <button
                        className="w-30 h-10 rounded-lg border-1 border-gray-300 cursor-pointer relative overflow-hidden group"
                        onClick={() => setIsCheck(!ischeck)}
                      >
                        <span className="relative z-5 group-hover:text-white text-black transition duration-600 ">View Invoice</span>
                        <span
                          className={`absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out`}
                        ></span>
                      </button>
                      {/* <button className="w-30 h-10 rounded-lg bg-blue-700 text-white cursor-pointer relative overflow-hidden group">
                    <span className="relative z-5 ">View Invoice</span>
                    <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
                  </button> */}
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
                    <span className="font-semibold">
                      {orderBlock?.orderInfo?.Address?.replace(/(Thành phố|Tỉnh)/g, " - $1")
                        ?.replace(/(Quận|Huyện|Thị xã)/g, " - $1")
                        ?.replace(/(Phường|Xã|Thị trấn)/g, " - $1")
                        ?.replace(/^ - /, "")}
                    </span>
                  </div>
                  {/* <h1 className="text-2xl font-semibold">Oder Tracking</h1> */}
                  <hr className="text-gray-300 w-full mt-5 " />
                  <div className="w-full flex items-center justify-between h-8 rounded-xl bg-yellow-50 mt-5 p-3 text-yellow-600">
                    <div className="flex items-center space-x-2 ">
                      <span>
                        <MdOutlineStarPurple500 />
                      </span>
                      <p>Please rate your exprience the seller</p>
                    </div>
                    <span className="cursor-pointer">
                      <IoCloseSharp />
                    </span>
                  </div>
                  {orderBlock?.items.map((item) => (
                    <div className="mt-5 pb-5">
                      <h1 className="text-md font-semibold">Delivered May 10</h1>
                      <div className="flex mt-3">
                        <img className="w-25 h-25 object-contain" src={item.Image ? item.Image : item.Id_Product.ImageUrl.path} alt="" />
                        <div className="ml-3">
                          <h2 className="font-semibold">{item.Id_Product?.Name}</h2>
                          <p className="text-gray-400 text-sm mt-2">Return of Replace items : Eligible through July 12,2023</p>
                          <div className="flex space-x-5 items-center text-blue-700 text-sm mt-3">
                            <span className="flex items-center space-x-1 cursor-pointer font-medium">
                              <RiArrowLeftRightLine />
                              <span>Buy it again</span>
                            </span>
                            <span className="text-[13px]">|</span>
                            <span className="flex items-center space-x-1 cursor-pointer font-medium">
                              <FaRegEye />
                              <span>View Product</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
