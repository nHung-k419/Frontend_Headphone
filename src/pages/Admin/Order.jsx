import React, { useEffect, useRef, useState } from "react";
import { GetAllOrder, UpdateStatusOrder, getAllCancleRequests, updateStatusCancleRequest } from "../../services/Admin/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsFillEyeFill } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import Modal from "../../components/ModalAdmin/Modal";
import OrderDetailModal from "../../components/ModalAdmin/OrderDetailModal";
import { CiLocationOn } from "react-icons/ci";
const Order = () => {
  const queryClient = useQueryClient();
  const [typeModal, setTypeModal] = useState({
    type: "",
    modal: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  const [valueSearch,setValueSearch] = useState("");
  const [currentItem,setCurrentItem] = useState("Tất cả");
  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: GetAllOrder,
  });
  // console.log(data);

  const handleShowDetail = (item,itemsDetail) => {
    setOrderDetail(prev => ({...prev,...item,...itemsDetail}));
    setIsOpen(true);
  };
  const { data: dataCancleRequest } = useQuery({
    queryKey: ["orderCancle"],
    queryFn: getAllCancleRequests,
  });

  const mutationUpdateSatusCancle = useMutation({
    mutationKey: ["updateStatusCancle"],
    mutationFn: updateStatusCancleRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orderCancle"]);
    },
  });
  const handleUpdateStatusCancle = (id, orderId, status) => {
    const data = { status: status.status, orderId };
    mutationUpdateSatusCancle.mutate({ id, data });
  };

  const mutationUpdateOrder = useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: UpdateStatusOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
    },
  });
  const handleUpdateStatus = (id, e) => {
    const data = { status: e.target.value };
    if (e.target.value === "Xác nhận" || e.target.value === "Đã giao") mutationUpdateOrder.mutate({ id, data });
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
  const filtersOrder = data?.getAllOrder?.filter((item) => {
    const filterSearch = item?.Fullname?.toLowerCase().includes(valueSearch.toLowerCase()) || item?.Address?.toLowerCase().includes(valueSearch.toLowerCase());
    const filterStatus = currentItem === "Tất cả" ? true : currentItem === "Đang chờ" ? item.Status.includes("Chờ") : item?.Status === currentItem ;
    return filterSearch && filterStatus;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto">
        {isOpen && <OrderDetailModal isOpen={isOpen} onClose={() => setIsOpen(false)} orderData={orderDetail} />}
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Quản lý đơn hàng
              </h1>
              <p className="text-gray-600 mt-2">Track and manage all customer orders in real-time</p>
            </div>

            {/* Notification Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTypeModal({ type: "orderCancle", modal: true })}
                className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-200"
              >
                <div className="flex items-center space-x-2">
                  <BsBell className="w-5 h-5" />
                  <span>Thông báo</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{dataCancleRequest?.allRequests?.length || 0}</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng số đơn hàng</p>
                <p className="text-3xl font-bold text-gray-800">{data?.getAllOrder?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Đang chờ</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {data?.getAllOrder?.filter((order) => order.Status === "Chờ xác nhận" || order.Status === "Chờ giao hàng")?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Đã giao</p>
                <p className="text-3xl font-bold text-green-600">
                  {data?.getAllOrder?.filter((order) => order.Status === "Đã giao")?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Tổng giá đơn hàng</p>
                <p className="text-2xl font-bold text-orange-600">
                  {data?.getAllOrder?.reduce((total, order) => total + (order.TotalAmount || 0), 0)?.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Modal remains the same */}
        {typeModal.modal && (
          <Modal typeModal={typeModal} setTypeModal={setTypeModal}>
            <div className="max-w-6xl w-180 rounded-xl mx-auto p-10 bg-white">
              <h2 className="text-2xl font-semibold mb-6"> Danh sách yêu cầu hủy đơn hàng</h2>

              <div className="space-y-4 overflow-y-scroll h-130">
                {/* Mỗi yêu cầu là 1 item */}
                {dataCancleRequest?.allRequests.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-md rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100"
                  >
                    {/* Thông tin đơn hàng */}
                    <div>
                      <p className="font-medium text-gray-800">
                        Mã đơn: <span className="text-blue-600">#{item?.orderId?._id}</span>
                      </p>
                      <p className="text-gray-500 text-sm">Khách hàng: {item?.orderId?.Fullname}</p>
                      <p className="text-gray-500 text-sm">Lý do: {item?.reason}</p>
                      <p className="text-gray-500 text-sm">Trạng thái: {item?.status}</p>
                      <p className="text-gray-400 text-xs mt-2">Gửi lúc: {new Date(item.requestedAt).toLocaleString("vi-VN")}</p>
                    </div>
                    {/* Nút xác nhận & từ chối */}
                    <div className="flex gap-2">
                      <button
                        disabled={item?.status === "Xác nhận"}
                        onClick={() => handleUpdateStatusCancle(item._id, item.orderId?._id, { status: "Xác nhận" })}
                        className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition text-sm cursor-pointer"
                      >
                        Xác nhận
                      </button>
                      <button
                        disabled={item?.status === "Xác nhận" || item?.status === "Từ chối"}
                        onClick={() => handleUpdateStatusCancle(item._id, item.orderId?._id, { status: "Từ chối" })}
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-sm cursor-pointer"
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}

        {/* Modern Orders Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách đơn hàng</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    onChange={(e) => setValueSearch(e.target.value)}
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  {["Tất cả","Đang chờ", "Đã giao"].map((item, index) => (
                    <button onClick={() => setCurrentItem(item)} className={`px-3 py-1 cursor-pointer ${currentItem === item ? "bg-orange-500 text-white" : ""} rounded-md text-sm font-medium text-gray-700`}>{item}</button>
                  // <button className="px-3 py-1 text-sm font-medium text-gray-500">Đang chờ</button>
                  // <button className="px-3 py-1 text-sm font-medium text-gray-500">Đã giao</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>#</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Tổng</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtersOrder?.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-orange-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-3 ${
                            item.Status === "Đã giao"
                              ? "bg-green-400"
                              : item.Status === "Chờ giao hàng"
                              ? "bg-blue-400"
                              : item.Status === "Đã hủy"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                        ></div>
                        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md">#{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">{item.Fullname?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.Fullname}</div>
                          <div className="text-xs text-gray-500">Customer #{item._id?.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 max-w-xs">
                        <div className="flex items-center space-x-1 ">
                          <CiLocationOn className="w-4 h-4"/>
                          <p className="w-2/3.5 truncate">{item.Address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            item.Status === "Đã giao"
                              ? "bg-green-100 text-green-800"
                              : item.Status === "Chờ giao hàng"
                              ? "bg-blue-100 text-blue-800"
                              : item.Status === "Đã hủy"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.Status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-green-600">{item.TotalAmount?.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <select
                          onChange={(e) => handleUpdateStatus(item._id, e)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm"
                        >
                          <option hidden className="text-center" value="">
                            Lựa chọn
                          </option>
                          <option
                            disabled={item.Status === "Chờ giao hàng" || item.Status === "Đã giao" || item.Status === "Đã hủy"}
                            className="text-center"
                            value="Xác nhận"
                          >
                            Xác nhận
                          </option>
                          <option
                            disabled={item.Status === "Đã giao" || item.Status !== "Chờ giao hàng"}
                            className="text-center"
                            value="Đã giao"
                          >
                            Đã giao
                          </option>
                        </select>
                        <button
                          onClick={() => handleShowDetail(item,data?.detailOrderItems[index])}
                          type="button"
                          className="inline-flex items-center p-2 border border-transparent rounded-lg text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200"
                        >
                          <BsFillEyeFill className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Showing</span>
                <span className="mx-1 font-semibold text-gray-900">1</span>
                <span>to</span>
                <span className="mx-1 font-semibold text-gray-900">{data?.getAllOrder?.length || 0}</span>
                <span>of</span>
                <span className="mx-1 font-semibold text-gray-900">{data?.getAllOrder?.length || 0}</span>
                <span>results</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Previous</button>
                <button className="px-3 py-1 text-sm bg-orange-600 text-white rounded-lg">1</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
